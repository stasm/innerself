import html from "../index";
import { connect } from "./store";

function CharCounter({value}) {
    return html`
        <div>Characters typed: ${value.length}</div>
    `;
}

export default connect(CharCounter);
