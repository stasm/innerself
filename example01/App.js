import html from "../dist/innerself.js";
import { connect } from "./store";

import ActiveList from "./ActiveList";
import ArchivedList from "./ArchivedList";

export default function App(tasks) {
    return html`
        ${ActiveList()}
        ${ArchivedList()}
        <script></script>
    `;
}
