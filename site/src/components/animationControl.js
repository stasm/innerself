import html from '../../../index'; // import innerself
import { connect } from '../reducers/store';

function AnimationControl({ bgAnimation }){
	let bgCanvas = window._bgCanvas;

	console.log('bgCanvas', bgCanvas);

	if (bgCanvas){
		let method = bgAnimation ? 'start' : 'pause';
		bgCanvas.back[method]();
		bgCanvas.front[method]();
	}

	return html`
		<div class="animation-control ${ bgAnimation ? 'playing' : 'paused' }">
			<span onClick="dispatch('TOGGLE_ANIMATION')">${ bgAnimation ? 'disable' : 'enable' } background animation</span>
		</div>
	`;
}

export default connect(AnimationControl);
