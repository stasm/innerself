import html from '../../../index'; // import innerself

import AnimationControl from './animationControl';

export default function Jumbo(content, transparentControl = false){
	return html`
		<div class="jumbo${ transparentControl ? ' transparent-bar' : '' }">
			<h2>${ content }</h2>
		</div>
	`;
}
