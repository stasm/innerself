import html from "../index";

export default function ActiveTask({task, index}) {
    return html`
        <li>
            ${task}
            <button
                onclick="dispatch('COMPLETE_TASK', ${index})">
                Mark As Done</button>
        </li>
    `;
}
