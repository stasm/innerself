import html from "../dist/innerself.js";
import { connect } from "./store";
import ArchivedTask from "./ArchivedTask";

function ArchiveList(state) {
    const { archive } = state;
    return html`
        <h2>Completed Tasks</h2>
        <ul>
            ${archive.map(ArchivedTask)}
        </ul>
    `;
}

export default connect(ArchiveList);
