import { attach } from "./store";
import App from "./App";

const root1 = document.querySelector("#root1");
const root2 = document.querySelector("#root2");
const root3 = document.querySelector("#root3");

attach(() => App(1), root1);
attach(() => App(2), root2);
attach(() => App(3), root3);

root2.addEventListener("render", function(event) {
    // event.detail is the state that was rendered.
    const { id, selectionStart, selectionEnd } = event.detail;
    if (id) {
        const textarea = root2.querySelector("#" + id);
        textarea.focus();
    }
});

root3.addEventListener("render", function(event) {
    // event.detail is the state that was rendered.
    const { id, selectionStart, selectionEnd } = event.detail;
    if (id) {
        const textarea = root3.querySelector("#" + id);
        textarea.focus();
        textarea.setSelectionRange(selectionStart, selectionEnd);
    }
});
