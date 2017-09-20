export default function combineReducers(reducers) {
    return function(state = {}, action, args) {
        return Object.entries(reducers).reduce(
            (acc, [name, reducer]) => Object.assign(acc, {
                [name]: reducer(state[name], action, args),
            }),
            state
        );
    }
}
