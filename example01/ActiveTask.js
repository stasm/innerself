import html from "../dist/innerself.js";

export default function ActiveTask(text, index) {
    return html`
        <li>
            ${text} ${index}
            <button
                onclick="dispatch('COMPLETE_TASK', ${index})">
                Mark As Done</button>
        </li>
    `;
}
