const TEMPLATE = document.createElement("template");
const ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};

export default function sanitize(value) {
    // Parse the HTML to inert DOM.
    TEMPLATE.innerHTML = value;
    // Strip all markup.
    const text = TEMPLATE.content.textContent;
    // Any HTML entities present in the original value have been unescaped by
    // textContent.  Sanitize the syntax-sensitive characters back to entities.
    return text.replace(/[&<>"']/g, ch => ENTITIES[ch]);
}
