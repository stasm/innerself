import html from '../../../index'; // import innerself

import Jumbo from '../components/jumbo';
import Section from '../components/section';
import LinkButton from '../components/button';

import Footer from '../components/footer';

const example1 = `
import html from "innerself";
import ActiveTask from "./ActiveTask";
export default function ActiveList(tasks) {
  return html\`
    &lt;h2\>My Active Tasks&lt;h2\>
    &lt;ul\>
      &#36;{tasks.map(ActiveTask)}
    &lt;ul\>\`;
}`;

const example2 = `
const { attach, connect, dispatch } = createStore(reducer);
window.dispatch = dispatch;
export { attach, connect };
`;


export default () => [
	Jumbo('A view management system'),
	Section({ id: 'introduction', className: 'bright', content: {
		before: `<div class="intro-middle"></div>`,
		left: `<h2>InnerHTML is fast.</h2>
		<p>innerHTML is fast. It's not fast enough if you're a Fortune 500 company or even if your app has more than just a handful of views. But it might be just fast enough for you if you care about code size.</p>
		${ LinkButton({ className: 'half', content: 'View Showcase', href: '#examples' }) }<br>
		${ LinkButton({ className: 'half', content: 'Star on GitHub', href: 'https://github.com/stasm/innerself' }) }
		`,
		right: `<h2>inspired by React and Redux.</h2>
		<ul>
			<li>composable components</li>
			<li>a single store</li>
			<li>a dispatch function</li>
			<li>reducers</li>
			<li>and even an optional logging middleware for debugging!</li>
		</ul>
		<p>It does all of this by serializing your component tree to a string and assigning it to innerHTML of a root element. It even imitates Virtual DOM diffing by comparing last known output of components with the new one :)
		I know this sounds like I'm crazy but it actually works quite nice for small and simple UIs.</p>`
	}}),
	Section({ className: 'dark narrow', content: `<h2>Background</h2>
		<p>I wrote innerself because I needed to make sense of the UI for a game I wrote for the js13kGames jam. The whole game had to fit into 13KB. I needed something extremely small which would not make me lose sanity. innerself clocks in at under 50 lines of code. That's around 600 bytes minified, ~350 gzipped.</p>
		`
	}),
	Section({ className: 'white', content: {
		left: `<h2>Basic Usage</h2>
		<p>innerself expects you to build a serialized version of your DOM which will then be assigned to innerHTML of a root element. The html helper allows you to easily interpolate Arrays.</p>
		`,
		right: `<pre>${ example1 }</pre>`
	}}),
	Section({ className: 'white', content: {
		left: `
		<p>The state of your app lives in a store, which you create by passing the reducer function to createStore:</p>
		`,
		right: `<pre>${ example2 }</pre>`
	}}),
	Section({ className: 'white centered', content:
      LinkButton({ className: 'single', content: 'Read full documentation', href: "https://github.com/stasm/innerself" })
   }),
	Section({ className: 'bright narrow two-col', content: `
		<h2>How It Works</h2>
      <div class="two-col">
   		<p>The update cycle starts with the dispatch function which passes the action to the reducer and updates the state.</p>
   		<p>When the state changes, the store compares the entire string output of top-level components (the ones attached to a root element in the DOM) with the output they produced last. This means that most of the time, even a slightest change in output will re-render the entire root.</p>
   		<p>It's possible to dispatch actions which change the state and don't trigger re-renders. For instance in example01 the text input dispatches CHANGE_INPUT actions on keyup events. The current value of the input is then saved in the store. Crucially, this value is not used by the TaskInput component to populate the input element. The whole thing relies on the fact that the native HTML input element stores its own state when the user is typing into it.</p>
   		<p>This limitation was fine for my use-case but it's worth pointing out that it badly hurts accessibility. Any change to the state which causes a re-render will make the currently focused element lose focus.</p>
   		<p>React is of course much smarter: the Virtual DOM is a lightweight representation of the render tree and updates to components produce an actual diff. React maps the items in the Virtual DOM to the elements in the real DOM and is able to only update what has really changed, regardless of its position in the tree.</p>
   		<p>Here's an interesting piece of trivia that I learned about while working on this project. React only re-renders components when their local state changes, as signaled by this.setState(). The fact that it also looks like components re-render when their props change derives from that as well. Something needs to pass those props in, after all, and this something is the parent component which first needs to decide to re-render itself.</p>
   		<p>When you think about how you can connect components with react-redux to avoid passing state to them from parents it becomes clear why behind the scenes it calls this.setState(dummyState) (which is an empty object) to trigger a re-render of the connected component :) It does this only when the sub-state as described by the selector (mapStateToProps) changes, which is easy to compute (and fast) if the reducers use immutability right. In the best case scenario it only needs to compare the identity of the sub-state to know that it's changed.</p>
      </div>
	`
   }),
   Footer()
].join('');
