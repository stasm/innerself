require = require("esm")(module);
const assert = require("assert");
const { createStore } = require("../index")

function counter(state = 0, action) {
    switch (action) {
        case "INCREMENT":
            return state + 1;
        default:
            return state;
    }
}

suite("render", function() {
    let store;
    let root;

    setup(function() {
        store = createStore(counter);
        root = mockElement();
    });

    test("assigns innerHTML of the root", function() {
        const { attach, dispatch } = store;

        // Always returns the same output.
        const TestApp = () => "Foo";
        attach(TestApp, root);

        dispatch("INCREMENT");
        assert.equal(root.innerHTML, "Foo");
    });

    test("re-assigns when the output changes", function() {
        const { attach, connect, dispatch } = store;

        const TestApp = state => `Foo ${state}`;
        const ConnectedTestApp = connect(TestApp);

        attach(ConnectedTestApp, root);
        assert.equal(root.innerHTML, "Foo 0");

        dispatch("INCREMENT");
        assert.equal(root.innerHTML, "Foo 1");

        dispatch("INCREMENT");
        assert.equal(root.innerHTML, "Foo 2");
    });

    test("dispatches an event when the output changes", function() {
        const { attach, connect, dispatch } = store;

        const TestApp = state => `Foo ${state}`;
        const ConnectedTestApp = connect(TestApp);
        attach(ConnectedTestApp, root);
        assert.deepEqual(root.dispatchEvent.args(), [{
            name: "render",
            detail: 0
        }]);

        dispatch("INCREMENT");
        assert.deepEqual(root.dispatchEvent.args(), [{
            name: "render",
            detail: 1
        }]);

        dispatch("INCREMENT");
        assert.deepEqual(root.dispatchEvent.args(), [{
            name: "render",
            detail: 2
        }]);
    });

    test("avoids re-assignment if the output doesn't change", function() {
        const { attach, connect, dispatch } = store;

        // Always returns the same output.
        const TestApp = () => "Foo";
        root._dirty.set("innerHTML", false);

        attach(TestApp, root);
        assert.equal(root._dirty.get("innerHTML"), true);

        root._dirty.set("innerHTML", false);
        dispatch("INCREMENT");
        assert.equal(root._dirty.get("innerHTML"), false);

        root._dirty.set("innerHTML", false);
        dispatch("INCREMENT");
        assert.equal(root._dirty.get("innerHTML"), false);
    });
});
