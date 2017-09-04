const init = {
    tasks: [],
    archive: []
};

function merge(...objs) {
    return Object.assign({}, ...objs);
}

export default function reducer(state = init, action, args) {
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
