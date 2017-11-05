import projects from './projects';

// data type constructors

const init = {
   route: '', // the default route
   bgAnimation: localStorage ? (localStorage.getItem('bgAnimation') == "true") : false || false,
   projects
};

console.log('hey!');

// init canvas (seems to not render if not done before hand)

export default function reducer(state = init, action, args) {
   switch (action) {
      case 'SET_ROUTE': {
         let [ route ] = args;
         return Object.assign({}, state, { route })
      }
      case 'TOGGLE_ANIMATION': {
         localStorage ? localStorage.setItem('bgAnimation', !state.bgAnimation) : console.log('no storage detected');
         return Object.assign({}, state, { bgAnimation: !state.bgAnimation })
      }
      default: return state;
   }
}
