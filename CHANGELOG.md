# CHANGELOG

## Unreleased

  - Encourage passing the `props` object as the first argument to components.

    Components are just functions so this isn't mandatory and you can still
    define arguments as you see fit.  The pattern of passing `props` makes
    composition easier, encourages code which is more readable and decouples
    the implementation of the component from the action of connecting it to the
    store.  From now on, connecting will only work for components with zero
    arity or which take an object as the first argument.

  - `connect` now takes a selector as an optional second argument.

    You can now pass an optional selector function to `connect`.  It will be
    passed the `state` and should return an object which will be merged with
    the component's `props` using `Object.assign({}, props, substate)`.

        connect(FooComponent, state => state.foo);

  - Filter out booleans in the html helper.

    Previously only `null` and `undefined` were filtered out. Now both `true`
    and `false` are never rendered. With this change it's now possible to use
    the `&&` operator for conditionals:

        html`${is_fetching && PleaseWait()}`

    Keep in mind that not all falsy values are filtered out. Most notably, `0`
    is still a valid interpolation value. As a consequence please be mindful
    when using numbers for the predicate. The following example will actually
    render `0`.

        html`${items.length && ItemList()}`

    You can fix this by explicitly using a comparison which returns a boolean
    which arguably also reads better:

        html`${items.length > 0 && ItemList()}`

  - Add an optional `combineReducers` module.

    The `combineReducers` function can be used to hand off state changes to
    smaller reducers.  Each reducer takes care of one sub-tree of the state and
    doesn't have access to the other parts.

    `combineReducers` takes an object of `{name: reducer}` as the only
    argument. The keys of the object will be used as top-level names in the
    resulting state tree and the values will be set to the return values of
    each of the reducers.


## 0.1.1 (September 12, 2017)

  - Dispatch the render event on roots. (#15)

    The render event provides a hook to add custom logic after the render is
    complete. It allows to restore focus, selection and caret positions after
    render.

  - Filter out null and undefined interpolations in the html helper. (#8)

  - Ignore tests and examples in npm. (#11)


## 0.1.0 (September 8, 2017)

This is the first release to be tracked in the changelog.
