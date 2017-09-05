function html([first, ...strings], ...values) {
    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    ).join("");
}

function create_store(reducer) {
    let state = reducer();
    const roots = new Map();

    function dispatch(action, ...args) {
        state = reducer(state, action, args);
        render();
    }

    function connect(component) {
        return function(...args) {
            return component(state, ...args);
        }
    }

    function render() {
        for (const [root, component] of roots) {
            root.innerHTML = component();
        }
    }

    function attach(component, root) {
        roots.set(root, component);
        render();
    }

    return {attach, connect, dispatch};
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

const init = {
    tasks: [],
    archive: []
};

function merge(...objs) {
    return Object.assign({}, ...objs);
}

function reducer(state = init, action, args) {
    switch (action) {
        case "ADD_TASK": {
            const {tasks} = state;
            const [value] = args;
            return merge(state, {
                tasks: [...tasks, value],
            });
        }
        case "COMPLETE_TASK": {
            const {tasks, archive} = state;
            const [index] = args;
            const task = tasks[index];
            return merge(state, {
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
    create_store(logger(reducer));

window.dispatch = dispatch;

function ActiveTask(text, index) {
    return html`
        <li>
            ${text} ${index}
            <button
                onclick="dispatch('COMPLETE_TASK', ${index})">
                Mark As Done</button>
        </li>
    `;
}

function TaskInput() {
    // XXX This is quite horrible.  We can't dispatch in onkeyup because the
    // input would lose focus due to re-rendering.  And we can't dispatch in
    // onchange/onblur because the most likely user action triggering those
    // events is a click on the button, which would be re-rendered in that
    // instant and not register a click.
    const onclick = `
        dispatch('ADD_TASK',
            document.querySelector('input').value)
    `;
    return html`
        <input type="text" placeholder="Type here…">
        <button onclick="${onclick}">Add</button>
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
