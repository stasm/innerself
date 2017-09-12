require = require("@std/esm")(module, {esm: "js"});

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

suite("connect", function() {
    let store;
    let root;

    setup(function() {
        store = createStore(counter);
        root = document.createElement("div");
    });

    test("passes the current state as the first argument", function() {
        const { attach, connect, dispatch } = store;

        const TestApp = spyFunction();
        const ConnectedTestApp = connect(TestApp);
        attach(ConnectedTestApp, root);
        dispatch("INCREMENT");

        assert.deepEqual(TestApp.args(), [1]);
    });

    test("passes other args after the state", function() {
        const { attach, connect, dispatch } = store;

        const TestComponent = spyFunction();
        const ConnectedTestComponent = connect(TestComponent);

        function TestApp() {
            return ConnectedTestComponent("Foo");
        }

        attach(TestApp, root);
        dispatch("INCREMENT");

        assert.deepEqual(TestComponent.args(), [1, "Foo"]);
    });
});
