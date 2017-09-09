import html from '../../index'; // import innerself

import BoxContainer from './BoxContainer';

export default function App() {
    return html`
        ${ BoxContainer() }
        <button onclick="dispatch('ADD_BOX')">Create New Box</button>
    `;
}
