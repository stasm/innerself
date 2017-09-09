const { JSDOM } = require("jsdom");

const { window } = new JSDOM("");
Object.keys(window).forEach(property => {
    if (typeof global[property] === "undefined") {
        global[property] = window[property];
    }
});
global.window = window;
global.navigator = {
    userAgent: "node.js"
};
