require = require("@std/esm")(module, {esm: "js"});

const assert = require("assert");
const sanitize = require("../sanitize").default;

suite("innerself/sanitize", function() {
    test("default export", function() {
        assert.equal(typeof sanitize, "function");
    });

    test("safe string", function() {
        const output = sanitize("Foo");
        assert.equal(output, "Foo");
    });

    test("markup", function() {
        const output = sanitize("<em>Foo</em>");
        assert.equal(output, "Foo");
    });

    test("markup via HTML entities", function() {
        const output = sanitize("&lt;em&gt;Foo&lt;/em&gt;");
        assert.equal(output, "&lt;em&gt;Foo&lt;/em&gt;");
    });

    test("HTML entities escaped with &amp;", function() {
        const output = sanitize("&amp;lt;em&amp;gt;Foo&amp;lt;/em&amp;gt;");
        assert.equal(output, "&amp;lt;em&amp;gt;Foo&amp;lt;/em&amp;gt;");
    });

    test("quotes", function() {
        const output = sanitize("\"Foo\"");
        assert.equal(output, "&quot;Foo&quot;");
    });

    test("quotes via HTML entities", function() {
        const output = sanitize("&quot;Foo&quot;");
        assert.equal(output, "&quot;Foo&quot;");
    });
});
