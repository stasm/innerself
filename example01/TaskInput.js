import html from "../dist/innerself.js";

export default function TaskInput() {
    // XXX This is quite horrible.  We can't dispatch in onkeyup because the
    // input would lose focus due to re-rendering.  And we can't dispatch in
    // onchange/onblur because the most likely user action triggering those
    // events is a click on the button, which would be re-rendered in that
    // instant and not register a click.
    const onclick = `
        dispatch('ADD_TASK',
            document.querySelector('input').value)
    `;
    return html`
        <input type="text" placeholder="Type here…">
        <button onclick="${onclick}">Add</button>
    `;
}
