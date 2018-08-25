import html from "../index";
import { connect } from "./store";
import ArchivedTask from "./ArchivedTask";

function ArchiveList({archive}) {
    return html`
        <h2>Completed Tasks</h2>
        <ul>
            ${archive.map(task => ArchivedTask({task}))}
        </ul>
    `;
}

export default connect(ArchiveList);
