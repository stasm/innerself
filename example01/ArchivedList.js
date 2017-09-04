import html from "../index";
import { connect } from "./store";
import ArchivedTask from "./ArchivedTask";

function ArchiveList(tasks) {
    return html`
        <h2>Completed Tasks</h2>
        <ul>
            ${tasks.map(ArchivedTask)}
        </ul>
    `;
}

export default connect(state => state.archive)(ArchiveList);
