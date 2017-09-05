import html from "../index";

export default function TaskInput() {
    return html`
        <input type="text" placeholder="Type here…"
            onchange="dispatch('CHANGE_INPUT', this.value)">
        <button onclick="dispatch('ADD_TASK')">Add</button>
    `;
}
