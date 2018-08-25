import html from "../index";

export default function ArchivedTask({task}) {
    return html`
        <li style="color:#666; text-decoration:line-through">
            ${task}
        </li>
    `;
}
