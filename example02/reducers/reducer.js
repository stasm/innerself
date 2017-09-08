const init = {
    boxes: []
};

export default function reducer(state = init, action, args) {
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
