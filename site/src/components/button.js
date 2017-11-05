import html from '../../../index'; // import innerself

export default function LinkButton(props = {}){
	props = Object.assign({
		href: '',
		className: '',
		id: '',
		content: ''
	}, props);

	return html`
		<a ${ props.id ? `id="${ props.id }"` : '' }
			${ props.href ? `href="${ props.href }"` : '' }
			class="button${ props.className ? ' ' + props.className : '' }">${ props.content }</a>`;
}
