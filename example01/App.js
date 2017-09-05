import html from "../index";
import { connect } from "./store";

import ActiveList from "./ActiveList";
import ArchivedList from "./ArchivedList";

export default function App(tasks) {
    return html`
        ${ActiveList()}
        ${ArchivedList()}
    `;
}
