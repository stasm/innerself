export default function html([first, ...strings], ...values) {
    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    ).join("");
}

export function create_store(reducer) {
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
