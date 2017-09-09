import {createStore} from '../../index'; // import innerself
import withLogger from '../../logger'; // import innerself/logger
import reducer from './reducer';

const { attach, connect, dispatch } =
    createStore(withLogger(reducer));

window.dispatch = dispatch;

export { attach, connect };
