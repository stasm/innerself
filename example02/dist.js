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

const init = {
    boxes: []
};

function reducer(state = init, action, args) {
    const random = Math.random;
    const floor = Math.floor;

    switch (action) {
        case "ADD_BOX": {
            const { boxes } = state;
            const BoxContainer = document.querySelector('#app > div');
            return Object.assign({}, state, {
                boxes: [...boxes, {
                    top: floor(random() * BoxContainer.clientHeight),
                    left: floor(random() * BoxContainer.clientWidth),
                    bg: `hsl(${ floor(random() * 360 )}, 70%, 70%)`,
                    scale: .25 + random() * .75 // should add up to 1 at most (1/4 scale at least)
                }]
            });
        }
        case "DESTROY_BOX": {
            const { boxes } = state;
            const [index] = args;
            return Object.assign({}, state, {
                boxes: [
                ...boxes.slice(0, index),
                ...boxes.slice(index + 1)
                ]
            });
        }
        default:
            return state;
    }
}

const { attach, connect, dispatch } =
    createStore(logger(reducer));

window.dispatch = dispatch;

function Box(state, index) {
    const { bg, top, left, scale } = state;

    return html`
        <div 
            class="floating-box" 
                onclick="dispatch('DESTROY_BOX', ${ index })"
                style="
                    background:${ bg };
                    top:${ top }px;
                    left:${ left }px;
                    transform: scale(${ scale })">Box #${ index }</div>
    `;
}

function BoxContainer(state) {
    const { boxes } = state;

    return html`<div>
        ${boxes.map(Box)}
        </div>`;
}

var BoxContainer$1 = connect(BoxContainer);

function App() {
    return html`
        ${ BoxContainer$1() }
        <button onclick="dispatch('ADD_BOX')">Create New Box</button>
    `;
}

attach(App, document.getElementById('app'));
