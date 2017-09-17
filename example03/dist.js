function html([first, ...strings], ...values) {
    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )

    // Filter out interpolations which are null or undefined.  null is
    // loosely-equal only to undefined and itself.
    .filter(value => value != null)
    .join("");
}

function createStore(reducer) {
    let state = reducer();
    const roots = new Map();
    const prevs = new Map();

    function render() {
        for (const [root, component] of roots) {
            const output = component();

            // Poor man's Virtual DOM implementation :)  Compare the new output
            // with the last output for this root.  Don't trust the current
            // value of root.innerHTML as it may have been changed by other
            // scripts or extensions.
            if (output !== prevs.get(root)) {
                prevs.set(root, output);
                root.innerHTML = output;

                // Dispatch an event on the root to give developers a chance to
                // do some housekeeping after the whole DOM is replaced under
                // the root. You can re-focus elements in the listener to this
                // event. See example03.
                const event = new CustomEvent("render", { detail: state });
                root.dispatchEvent(event);
            }
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(component) {
            // Return a decorated component function.
            return (...args) => component(state, ...args);
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        },
    };
}

function logger(reducer) {
    return function(prev_state, action, args) {
        console.group(action);
        console.log("Previous State", prev_state);
        console.log("Action Arguments", args);
        const next_state = reducer(prev_state, action, args);
        console.log("Next State", next_state);
        console.groupEnd();
        return next_state;
    }
}

const TEMPLATE = document.createElement("template");

const init = {
    id: "",
    value: "",
};

function reducer(state = init, action, args) {
    switch (action) {
        case "CHANGE_VALUE": {
            const [textarea] = args;
            return Object.assign({}, state, {
                id: textarea.id,
                value: textarea.value,
                selectionStart: textarea.selectionStart,
                selectionEnd: textarea.selectionEnd,
            });
        }
        default:
            return state;
    }
}

const { attach, connect, dispatch } =
    createStore(logger(reducer));

window.dispatch = dispatch;

function TextInput({value}, idx) {
    return html`
        <textarea id="text-input-${idx}"
            placeholder="Type here…"
            onkeyup="dispatch('CHANGE_VALUE', this)">${value}</textarea>
    `;
}

var TextInput$1 = connect(TextInput);

function CharCounter({value}) {
    return html`
        <div>Characters typed: ${value.length}</div>
    `;
}

var CharCounter$1 = connect(CharCounter);

function App(idx) {
    return html`
        ${TextInput$1(idx)}
        ${CharCounter$1()}
    `;
}

const root1 = document.querySelector("#root1");
const root2 = document.querySelector("#root2");
const root3 = document.querySelector("#root3");

attach(() => App(1), root1);
attach(() => App(2), root2);
attach(() => App(3), root3);

root2.addEventListener("render", function(event) {
    // event.detail is the state that was rendered.
    const { id, selectionStart, selectionEnd } = event.detail;
    if (id) {
        const textarea = root2.querySelector("#" + id);
        textarea.focus();
    }
});

root3.addEventListener("render", function(event) {
    // event.detail is the state that was rendered.
    const { id, selectionStart, selectionEnd } = event.detail;
    if (id) {
        const textarea = root3.querySelector("#" + id);
        textarea.focus();
        textarea.setSelectionRange(selectionStart, selectionEnd);
    }
});
