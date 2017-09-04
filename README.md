# innerself

A tiny view + state management solution using innerHTML.

[innerHTML is fast][1].  It's not fast enough if you're a Fortune 500 company
or even if your app has more than just a handful of views.  But it might be
just fast enough for you if you care about code size.

I wrote `innerself` because I needed to make sense of the UI for a game I wrote
for the [js13kGames][1] jam.  The whole game had to fit into 13KB.  I needed
something extremely small which would not make me lose sanity.

`innerself` is inspired by React and Redux.  It offers the following familiar
concepts:

  - composable components,
  - a single store,
  - a `dispatch` function,
  - reducers,
  - and even a logging midldeware!

It does all of this by serializing your component tree to a string and
assigning it to `innerHTML` of a root element.  I know this sounds like I'm
crazy, but it actually works quite nice for small and simple UIs.

If you don't care about size contraints, do yourself a favor and use a real
framework.  `innerself` is not meant as a competitor for React, preact, Vue.js,
Angular etc.  These are fantastic tools which don't sacrifice code clarity and
ease of use for bytes.

[1]: https://www.quirksmode.org/dom/innerhtml.html
[2]: http://js13kgames.com/


## Install

    $ npm install innerself


## Usage

`innerself` expects you to build a serialized version of your DOM which will
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
function to `create_store`:

```javascript
const { attach, connect, dispatch } = create_store(reducer);
window.dispatch = dispatch;
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
wrap it in a function][3] which takes the `event` as the first argument (in
most cases) and in which `this` refers to the DOM Element on which the event
has been registered.

[3]:https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers#Event_handler's_parameters_this_binding_and_the_return_value

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
  - Expose global action crteators.
  - Put them in the reducer.  (This is considered a bad practice in Redux
    because it makes the reduces unpredictable and harder to test.)

The `dispatch` function will also re-render the entire top-level component.  In
order to be able to do so, it needs to know where in the DOM to put the
`innerHTML` the top-level component generated.  This is what `attach` returned
by `create_store` is for:

```javascript
import { attach } from "./store";
import App from "./App";

attach(App, document.querySelector("#root"));
```

`create_store` also returns a `connect` function.  Use it to avoid passing data
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


## Crazy, huh?

I know, I know.  But it works!  Check out the example in `example01`.
