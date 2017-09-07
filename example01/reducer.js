import sanitize from "../sanitize";

const init = {
    input_value: "",
    tasks: [],
    archive: []
};

export default function reducer(state = init, action, args) {
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
