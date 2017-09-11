import sanitize from "../sanitize";

const init = {
    id: "",
    value: "",
};

export default function reducer(state = init, action, args) {
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
