import html from "../index";
import { connect } from "./store";

function TextInput({value}, idx) {
    return html`
        <textarea id="text-input-${idx}"
            placeholder="Type here…"
            onkeyup="dispatch('CHANGE_VALUE', this)">${value}</textarea>
    `;
}

export default connect(TextInput);
