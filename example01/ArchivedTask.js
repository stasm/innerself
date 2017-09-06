import html from "../dist/innerself.js";

export default function ArchivedTask(text) {
    return html`
        <li style="color:#666; text-decoration:line-through">
            ${text}
        </li>
    `;
}
