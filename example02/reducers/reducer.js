const init = {
    boxes: []
};

export default function reducer(state = init, action, args) {
    const random = Math.random;
    const floor = Math.floor;

    switch (action) {
        case "ADD_BOX": {
            const { boxes } = state;
            return Object.assign({}, state, {
                boxes: [...boxes, {
                    top: floor(random() * document.body.clientHeight),
                    left: floor(random() * document.body.clientWidth),
                    bg: `hsl(${ floor(random() * 360 )}, 70%, 70%)`,
                    scale: .5 + random() * 1.5 // should add up to 2 at most (half at least)
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
