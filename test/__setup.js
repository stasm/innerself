const { JSDOM } = require("jsdom");

const { window } = new JSDOM("", {
    url: "http://localhost",
});
Object.keys(window).forEach(property => {
    if (typeof global[property] === "undefined") {
        global[property] = window[property];
    }
});
global.window = window;
global.CustomEvent = function CustomEvent(name, {detail}) {
    this.name = name;
    this.detail = detail;
}

global.spyFunction = function(orig = x => void x) {
    let _args = [];

    function fake(...args) {
        _args = args;
        return orig(...args);
    }

    fake.args = () => _args;
    return fake;
}

global.mockElement = function() {
    let _innerHTML = "";

    return {
        _dirty: new Map(),
        set innerHTML(value) {
            this._dirty.set("innerHTML", true);
            _innerHTML = value;
        },
        get innerHTML() {
            return _innerHTML;
        },
        dispatchEvent: spyFunction()
    };
}
