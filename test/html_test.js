require = require("@std/esm")(module, {esm: "js"});

const assert = require("assert");
const { default: html } = require("../index")

suite("html", function() {
    test("default export", function() {
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

    test("true interpolation", function() {
        const output = html`Foo ${true}`;
        assert.equal(output, "Foo ");
    });

    test("false interpolation", function() {
        const output = html`Foo ${false}`;
        assert.equal(output, "Foo ");
    });

    test("null interpolation", function() {
        const output = html`Foo ${null}`;
        assert.equal(output, "Foo ");
    });

    test("undefined interpolation", function() {
        const output = html`Foo ${undefined}`;
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

    test("a true predicate", function() {
        const output = html`Foo ${true && "Bar"}`;
        assert.equal(output, "Foo Bar");
    });

    test("a false predicate", function() {
        const output = html`Foo ${false && "Bar"}`;
        assert.equal(output, "Foo ");
    });

    test("a null predicate", function() {
        const output = html`Foo ${null && "Bar"}`;
        assert.equal(output, "Foo ");
    });

    test("an undefined predicate", function() {
        const output = html`Foo ${undefined && "Bar"}`;
        assert.equal(output, "Foo ");
    });

    test("a truthy number predicate", function() {
        const output = html`Foo ${1 && "Bar"}`;
        assert.equal(output, "Foo Bar");
    });

    test("a falsy number predicate", function() {
        const output = html`Foo ${0 && "Bar"}`;
        assert.equal(output, "Foo 0");

        // A real-life example.
        const items = [];
        assert.equal(html`${items.length && "Has items"}`, "0");
        items.push("Foo");
        assert.equal(html`${items.length && "Has items"}`, "Has items");
    });

    test("work-around for a falsy number predicate", function() {
        const output = html`Foo ${0 > 0 && "Bar"}`;
        assert.equal(output, "Foo ");

        // A real-life example.
        const items = [];
        assert.equal(html`${items.length > 0 && "Has items"}`, "");
        items.push("Foo");
        assert.equal(html`${items.length && "Has items"}`, "Has items");
    });
});
