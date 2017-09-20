# CHANGELOG

## Unreleased

  - `connect` now takes a selector as an optional second argument.

    You can now pass an optional selector function to `connect`.  It will be
    passed the `state` and should return whatever the connected component
    expects as the first argument.

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


## 0.1.1 (September 12, 2017)

  - Dispatch the render event on roots. (#15)

    The render event provides a hook to add custom logic after the render is
    complete. It allows to restore focus, selection and caret positions after
    render.

  - Filter out null and undefined interpolations in the html helper. (#8)

  - Ignore tests and examples in npm. (#11)


## 0.1.0 (September 8, 2017)

This is the first release to be tracked in the changelog.
