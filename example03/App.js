import html from "../index";

import TextInput from "./TextInput";
import CharCounter from "./CharCounter";

export default function App(idx) {
    return html`
        ${TextInput({idx})}
        ${CharCounter()}
    `;
}
