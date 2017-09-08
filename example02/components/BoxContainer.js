import html from "../../index"; // import innerself
import { connect } from '../reducers/store';

import Box from './Box';

function BoxContainer(state) {
    const { boxes } = state;

    return html`<div>
        ${boxes.map(Box)}
        </div>`;
}

export default connect(BoxContainer);
