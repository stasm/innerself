import html from '../../../index'; // import innerself

import Section from './section';

export default function Footer(){
	return Section( { tagName: 'footer', content: `
		<span>Created by <a href="https://twitter.com/stas">Staś Małolepszy</a></span><span>Site designed by <a href="https://github.com/GoldenRust">GoldenRust</a>, and built by <a href="https://twitter.com/flynnbuckingham">Flynn Buckingham</a></span>
	`});
}
