import html from "../index";
import { connect } from "./store";
import ActiveTask from "./ActiveTask";
import TaskInput from "./TaskInput";

function ActiveList(tasks) {
    return html`
        <h2>My Active Tasks</h2>
        <ul>
            ${tasks.map(ActiveTask)}
            <li>
                ${TaskInput()}
            </li>
        </ul>
    `;
}

export default connect(state => state.tasks)(ActiveList);
