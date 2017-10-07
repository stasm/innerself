import html from '../../index'; // import innerself

import { connect } from './reducers/store';

import FrontPage from './pages/front';
import ExamplePage from './pages/examples';

const routes = {
   '': FrontPage,
   'home': FrontPage,
   'examples': ExamplePage
}

// a simple url router will render the matching route into the viewbox
const renderRoute = route =>
   (typeof routes[route] === "function") ? routes[route]() : '';

// routes to the page by extracting the hash value of the url
const routeFromUrlHash = () => {
   let hash = window.location.hash.split('#')[1];
   return (routes.hasOwnProperty(hash)) ?
      dispatch('SET_ROUTE', hash) : // route
      console.warn('cannot route to un-registered route', hash); // do nothing but complain
}

function RouterComponent(state) {
   const { route } = state;
   return html`
      ${ renderRoute(route) }
   `;
}

// re-route when a hash change is detected
window.addEventListener('hashchange', () => routeFromUrlHash());

// route to page based on current hash
routeFromUrlHash(window.location.href);

export default connect(RouterComponent);
