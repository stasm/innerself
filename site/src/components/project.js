import html from '../../../index'; // import innerself

import LinkButton from '../components/button';

export default function Project(props = {}){
	props = Object.assign({
		title: '',
		desc: '',
		repo: '',
		demo: '',
		id: '',
		authors: [],
		buttonClass: '',
		customSource: ''
	}, props);

	return html`
		<article ${ props.id ? `id="${ props.id }"` : '' } class="project">
			<h3>${ props.title }</h3>
			<p class="authors">${ props.authors.map(author => `<a href="${ author.link }">${ author.name }</a>`) }</p>
			<p>${ props.desc }</p>
			<div>
				${ props.demo ? LinkButton({ className: props.buttonClass, href: props.demo, content: 'Live Example' }) : '' }
				${ LinkButton({ className: props.buttonClass, href: props.repo, content: props.customSource ? props.customSource : 'GitHub' }) }
			</div>
		</article>
	`;
}
