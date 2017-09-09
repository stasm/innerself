require = require("@std/esm")(module, {esm: "js"});

const assert = require("assert");
const { default: html } = require("../index")

suite("The html helper", function() {
    test("is default export", function() {
        assert.equal(typeof html, "function");
    });

    test("no interpolations", function() {
        const output = html`Foo Bar`;
        assert.equal(output, "Foo Bar");
    });

    test("string interpolation", function() {
        const str = "Bar";
        const output = html`Foo ${str} Baz`;
        assert.equal(output, "Foo Bar Baz");
    });

    test("number interpolation", function() {
        const num = 4;
        const output = html`Foo ${num}`;
        assert.equal(output, "Foo 4");
    });

    test("array interpolation", function() {
        const arr = ["Bar", "Baz"];
        const output = html`Foo ${arr}`;
        assert.equal(output, "Foo BarBaz");
    });

    test("falsy interpolation", function() {
        const falsy = null;
        const output = html`Foo ${falsy}`;
        assert.equal(output, "Foo ");
    });

    test("falsy string interpolation", function() {
        const str = "";
        const output = html`Foo ${str} Baz`;
        assert.equal(output, "Foo  Baz");
    });

    test("falsy number interpolation", function() {
        const num = 0;
        const output = html`Foo ${num}`;
        assert.equal(output, "Foo 0");
    });
});
