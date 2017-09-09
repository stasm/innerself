function html([first, ...strings], ...values) {
    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    ).join("");
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
const ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};

function sanitize(value) {
    // Parse the HTML to inert DOM.
    TEMPLATE.innerHTML = value;
    // Strip all markup.
    const text = TEMPLATE.content.textContent;
    // Any HTML entities present in the original value have been unescaped by
    // textContent.  Sanitize the syntax-sensitive characters back to entities.
    return text.replace(/[&<>"']/g, ch => ENTITIES[ch]);
}

const init = {
    input_value: "",
    tasks: [],
    archive: []
};

function reducer(state = init, action, args) {
    switch (action) {
        case "CHANGE_INPUT": {
            const [input_value] = args;
            return Object.assign({}, state, {
                input_value: sanitize(input_value)
            });
        }
        case "ADD_TASK": {
            const {tasks, input_value} = state;
            return Object.assign({}, state, {
                tasks: [...tasks, input_value],
                input_value: ""
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

const { attach, connect, dispatch } =
    createStore(logger(reducer));

window.dispatch = dispatch;

function ActiveTask(text, index) {
    return html`
        <li>
            ${text}
            <button
                onclick="dispatch('COMPLETE_TASK', ${index})">
                Mark As Done</button>
        </li>
    `;
}

function TaskInput() {
    return html`
        <input type="text" placeholder="Type here…"
            onchange="dispatch('CHANGE_INPUT', this.value)">
        <button onclick="dispatch('ADD_TASK')">Add</button>
    `;
}

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

var ActiveList$1 = connect(ActiveList);

function ArchivedTask(text) {
    return html`
        <li style="color:#666; text-decoration:line-through">
            ${text}
        </li>
    `;
}

function ArchiveList(state) {
    const { archive } = state;
    return html`
        <h2>Completed Tasks</h2>
        <ul>
            ${archive.map(ArchivedTask)}
        </ul>
    `;
}

var ArchivedList = connect(ArchiveList);

function App(tasks) {
    return html`
        ${ActiveList$1()}
        ${ArchivedList()}
    `;
}

attach(App, document.querySelector("#root"));
