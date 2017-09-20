require = require("@std/esm")(module, {esm: "js"});

const assert = require("assert");
const { createStore } = require("../index")

suite("connect", function() {
    let store;
    let root;

    function counter(state = 0, action) {
        switch (action) {
            case "INCREMENT":
                return state + 1;
            default:
                return state;
        }
    }

    setup(function() {
        store = createStore(counter);
        root = document.createElement("div");
    });

    test("pass the current state as the first argument", function() {
        const { attach, connect, dispatch } = store;

        const TestApp = spyFunction();
        const ConnectedTestApp = connect(TestApp);

        attach(ConnectedTestApp, root);
        assert.deepEqual(TestApp.args(), [0]);

        dispatch("INCREMENT");
        assert.deepEqual(TestApp.args(), [1]);
    });

    test("pass other args after the state", function() {
        const { attach, connect, dispatch } = store;

        const TestComponent = spyFunction();
        const ConnectedTestComponent = connect(TestComponent);

        function TestApp() {
            return ConnectedTestComponent("Foo");
        }

        attach(TestApp, root);
        assert.deepEqual(TestComponent.args(), [0, "Foo"]);

        dispatch("INCREMENT");
        assert.deepEqual(TestComponent.args(), [1, "Foo"]);
    });
});

suite("connect with a selector", function() {
    let store;
    let root;

    function counter(state = {current: 0}, action) {
        switch (action) {
            case "INCREMENT":
                return {current: state.current + 1};
            default:
                return state;
        }
    }

    setup(function() {
        store = createStore(counter);
        root = document.createElement("div");
    });

    test("use the identity selector by default", function() {
        const { attach, connect, dispatch } = store;

        const TestApp = spyFunction();
        const ConnectedTestApp = connect(TestApp);

        attach(ConnectedTestApp, root);
        assert.deepEqual(TestApp.args(), [{current: 0}]);

        dispatch("INCREMENT");
        assert.deepEqual(TestApp.args(), [{current: 1}]);
    });

    test("apply the selector to the state", function() {
        const { attach, connect, dispatch } = store;

        const TestApp = spyFunction();
        const ConnectedTestApp = connect(TestApp, state => state.current);

        attach(ConnectedTestApp, root);
        assert.deepEqual(TestApp.args(), [0]);

        dispatch("INCREMENT");
        assert.deepEqual(TestApp.args(), [1]);
    });
});
