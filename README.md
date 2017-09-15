# innerself

A tiny view + state management solution using `innerHTML`.  Live demos:
[example01][], [example02][].

[`innerHTML` is fast][quirksmode].  It's not fast enough if you're a Fortune 500 company
or even if your app has more than just a handful of views.  But it might be
just fast enough for you if you care about code size.

I wrote _innerself_ because I needed to make sense of the UI for a game I wrote
for the [js13kGames][] jam.  The whole game had to fit into 13KB.  I needed
something extremely small which would not make me lose sanity.  _innerself_
clocks in at under 50 lines of code.  That's around 600 bytes minified, ~350
gzipped.

_innerself_ is inspired by React and Redux.  It offers the following familiar
concepts:

  - composable components,
  - a single store,
  - a `dispatch` function,
  - reducers,
  - and even an optional logging middleware for debugging!

It does all of this by serializing your component tree to a string and
assigning it to `innerHTML` of a root element.  It even imitates Virtual DOM
diffing by comparing last known output of components with the new one :)
I know this sounds like I'm crazy but it actually works quite nice for small
and simple UIs.

If you don't care about size constraints, _innerself_ might not be for you.
Real frameworks like React have much more to offer, don’t sacrifice safety,
accessibility, nor performance, and you probably won’t notice their size
footprint.

_innerself_ was a fun weekend project for me.  Let me know what you think!

[Live demo]: https://stasm.github.io/innerself/example01/
[quirksmode]: https://www.quirksmode.org/dom/innerhtml.html
[js13kGames]: http://js13kgames.com/


## Install

    $ npm install innerself


## Caveats

You need to know a few things before you jump right in.  _innerself_ is
a less-than-serious pet project and I don't recommend using it in production.

It's a poor choice for form-heavy UIs.  It tries to avoid unnecessary
re-renders, but they still happen if the DOM needs even a tiniest update.  Your
form elements will keep losing focus because every re-render is essentially
a new assignment to the root element's `innerHTML`.

When dealing with user input in serious scenarios, any use of `innerHTML`
requires sanitization.  _innerself_ doesn't do anything to protect you or your
users from XSS attacks.  If you allow keyboard input or display data fetched
from a database, please take special care to secure your app.  The
`innerself/sanitize` module provides a rudimentary sanitization function.

Perhaps the best use-case for _innerself_ are simple mouse-only UIs with no
keyboard input at all :)


## Showcase

  - [A moment lost in time.][moment-lost] - a first-person exploration puzzle
    game by [@michalbe][] and myself.  I originally wrote _innerself_ for this.
  - [Innerself Hacker News Clone][innerself-hn] - a Hacker News single page app by [@bsouthga][] with
   innerself as the only dependency. Also serves as an example of a [TypeScript][typescript] innerself app.


[moment-lost]: https://github.com/piesku/moment-lost
[@michalbe]: https://github.com/michalbe
[innerself-hn]: https://github.com/bsouthga/innerself-hn
[@bsouthga]: https://github.com/bsouthga
[typescript]: https://github.com/Microsoft/TypeScript


## Usage

_innerself_ expects you to build a serialized version of your DOM which will
then be assigned to `innerHTML` of a root element.  The `html` helper allows
you to easily interpolate Arrays.

```javascript
import html from "innerself";
import ActiveTask from "./ActiveTask";

export default function ActiveList(tasks) {
    return html`
        <h2>My Active Tasks</h2>
        <ul>
            ${tasks.map(ActiveTask)}
        </ul>
    `;
}
```

The state of your app lives in a store, which you create by passing the reducer
function to `createStore`:

```javascript
const { attach, connect, dispatch } = createStore(reducer);
window.dispatch = dispatch;
export { attach, connect };
```

You need to make `dispatch` available globally in one way or another.  You can
rename it, namespace it or put it on a DOM Element. The reason why it needs to
be global is that the entire structure of your app must be serializable to
string at all times.  This includes event handlers, too.

```javascript
import html from "innerself";

export default function ActiveTask(text, index) {
    return html`
        <li>
            ${text} ${index}
            <button
                onclick="dispatch('COMPLETE_TASK', ${index})">
                Mark As Done</button>
        </li>
    `;
}
```

You can put any JavaScript into the `on<event>` attributes. [The browser will
wrap it in a function][mdn-event] which takes the `event` as the first argument
(in most cases) and in which `this` refers to the DOM Element on which the
event has been registered.

[mdn-event]: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers#Event_handler's_parameters_this_binding_and_the_return_value

The `dispatch` function takes an action name and a variable number of
arguments.  They are passed to the reducer which should return a new version of
the state.

```javascript
const init = {
    tasks: [],
    archive: []
};

export default function reducer(state = init, action, args) {
    switch (action) {
        case "ADD_TASK": {
            const {tasks} = state;
            const [value] = args;
            return Object.assign({}, state, {
                tasks: [...tasks, value],
            });
        }
        case "COMPLETE_TASK": {
            const {tasks, archive} = state;
            const [index] = args;
            const task = tasks[index];
            return Object.assign({}, state, {
                tasks: [
                    ...tasks.slice(0, index),
                    ...tasks.slice(index + 1)
                ],
                archive: [...archive, task]
            });
        }
        default:
            return state;
    }
}
```

If you need side-effects, you have three choices:

  - Put them right in the `on<event>` attributes.
  - Expose global action creators.
  - Put them in the reducer.  (This is considered a bad practice in Redux
    because it makes the reducer unpredictable and harder to test.)

The `dispatch` function will also re-render the entire top-level component if
the state changes require it.  In order to be able to do so, it needs to know
where in the DOM to put the `innerHTML` the top-level component generated.
This is what `attach` returned by `createStore` is for:

```javascript
import { attach } from "./store";
import App from "./App";

attach(App, document.querySelector("#root"));
```

`createStore` also returns a `connect` function.  Use it to avoid passing data
from top-level components down to its children where it makes sense.  In the
first snippet above, `ActiveList` receives a `tasks` argument which must be
passed by the top-level component.

Instead you can do this:

```javascript
import html from "innerself";
import { connect } from "./store";
import ActiveTask from "./ActiveTask";
import TaskInput from "./TaskInput";

function ActiveList(state) {
    const { tasks } = state;
    return html`
        <h2>My Active Tasks</h2>
        <ul>
            ${tasks.map(ActiveTask)}
            <li>
                ${TaskInput()}
            </li>
        </ul>
    `;
}

export default connect(ActiveList);
```

You can then avoid passing the state explicitly in the top-level component:

```javascript

import html from "innerself";
import { connect } from "./store";

import ActiveList from "./ActiveList";
import ArchivedList from "./ArchivedList";

export default function App(tasks) {
    return html`
        ${ActiveList()}
        ${ArchivedList()}
    `;
}
```

Connected components always receive the current state as their first argument,
and then any other arguments passed explicitly by the parent.


## Logging Middleware

_innerself_ comes with an optional helper middleware which prints state
changes to the console.  To use it, simply decorate your reducer with the
default export of the `innerself/logger` module:

```javascript
import { createStore } from "innerself";
import withLogger from "innerself/logger";
import reducer from "./reducer"

const { attach, connect, dispatch } =
    createStore(withLogger(reducer));
```


## Crazy, huh?

I know, I know.  But it works!  Check out the examples:

  - [example01][] - an obligatory Todo App.
  - [example02][] by @flynnham.
  - [example03][] illustrates limitations of _innerself_ when dealing with text
    inputs and how to work around them.

[example01]: https://stasm.github.io/innerself/example01/
[example02]: https://stasm.github.io/innerself/example02/
[example03]: https://stasm.github.io/innerself/example03/


## How It Works

The update cycle starts with the `dispatch` function which passes the action to
the reducer and updates the state.

When the state changes, the store [compares the entire string output][diff] of
top-level components (the ones attached to a root element in the DOM) with the
output they produced last. This means that most of the time, even a slightest
change in output will re-render the entire root.

It's possible to dispatch actions which change the state and don't trigger
re-renders. For instance in `example01` the text input dispatches
`CHANGE_INPUT` actions on `keyup` events. The current value of the input is
then saved in the store. Crucially, this value is not used by the `TaskInput`
component to populate the input element. The whole thing relies on the fact
that the native HTML input element stores its own state when the user is typing
into it.

This limitation was fine for my use-case but it's worth pointing out that it
badly hurts accessibility. Any change to the state which causes a re-render
will make the currently focused element lose focus.

React is of course much smarter: the Virtual DOM is a lightweight
representation of the render tree and updates to components produce an actual
diff. React maps the items in the Virtual DOM to the elements in the real DOM
and is able to only update what has really changed, regardless of its position
in the tree.

Here's an interesting piece of trivia that I learned about while working on
this project. React only re-renders components when their local state changes,
as signaled by `this.setState()`. The fact that it also looks like components
re-render when their props change derives from that as well. Something needs to
pass those props in, after all, and this something is the parent component
which first needs to decide to re-render itself.

When you think about how you can `connect` components with _react-redux_ to
avoid passing state to them from parents it becomes clear why behind the scenes
it calls [`this.setState(dummyState)`][dummy] (which is an empty object) to
trigger a re-render of the connected component :) It does this only when the
sub-state as described by the selector (`mapStateToProps`) changes, which is
easy to compute (and fast) if the reducers use immutability right. In the best
case scenario it only needs to compare the identity of the sub-state to know
that it's changed.

[diff]: https://github.com/stasm/innerself/blob/7aa2e6857fd05cc7047dcd3bbdda6d3820b76f42/index.js#L20-L27
[dummy]: https://github.com/reactjs/react-redux/blob/fd81f1812c2420aa72805b61f1d06754cb5bfb43/src/components/connectAdvanced.js#L218
