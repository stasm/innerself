const project = (title, desc, authors, repo, demo, buttonClass, customSource) => { return { title, desc, authors, repo, demo, buttonClass, customSource } };
const author = (name, link) => { return { name, link } };

// storage for common authors
const $ = {
	Stas: author('Staś Małolepszy', 'https://github.com/stasm')
}

export default [
	project('Innerself Hacker News Clone',
		'A Hacker News single page app with innerself as the only dependency. Also serves as an example of a TypeScript innerself app.',
		[author('Ben Southgate', 'https://github.com/bsouthga')], 'https://github.com/bsouthga/innerself-hn', 'https://innerself-hn.com/', 'hollow'),

	project('Reach/Steal Draft Tracker',
		'A fantasy football draft tracker that tests the rendering performance with 300+ table rows backed by an expressjs server.',
		[author('Brian Ruddy', 'https://github.com/bcruddy')], 'https://github.com/bcruddy/reach-steal', 'https://reach-steal.herokuapp.com/'),

	project('A moment lost in time',
		'A first-person exploration puzzle game.',
		[author('Michał Budzyński', 'https://github.com/michalbe'), $.Stas], 'https://github.com/piesku/moment-lost', 'http://js13kgames.com/entries/a-moment-lost-in-time'),

	project('TodoMVC',
		'A TodoMVC app based on innerself.',
		[author('Cweili', 'https://github.com/Cweili')], 'https://codepen.io/Cweili/pen/ZXOeQa', '', '', 'CodePen'),

	project('Example01',
		'A simple ToDo app built with innerself',
		[$.Stas], 'https://github.com/stasm/innerself/tree/master/example01', 'https://stasm.github.io/innerself/example01/'),

	project('Example02',
		'A simple example that shows state management with coloured boxes',
		[author('Flynn Buckingham', 'https://github.com/flynnham')], 'https://github.com/stasm/innerself/tree/master/example02', 'https://stasm.github.io/innerself/example02/'),

	project('Example03',
		'An illustration of the limitations of innerself when dealing with text inputs and how to work around them.',
		[$.Stas], 'https://github.com/stasm/innerself/tree/master/example03', 'https://stasm.github.io/innerself/example03/')
];
