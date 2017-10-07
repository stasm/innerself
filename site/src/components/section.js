import html from '../../../index'; // import innerself

export default function Jumbo(props = {}){
	let { className, id, content, tagName } = props;

	let split = (typeof content === "object"); // assume 'left' and 'right' if object

	// setup default values to prevent errors on dynamic content
	split && (content = Object.assign({
		before: '',
		left: '', right: '',
		after: ''
	}, content));

	tagName = (typeof tagName === "string") ? tagName : 'section';

	return html`
		<${ tagName } ${ id ? `id="${ id }"` : '' } ${ className ? `class="${ className }"` : '' }>
			${ split ? content.before : '' }
			<div class="container">
				${ split ?
				`<div class="left">${ content.left }</div><div class="right">${ content.right }</div>` :
				`<div>${ content }</div>` }
			</div>
			${ split ? content.after : '' }
		</${ tagName }>
	`;
}
