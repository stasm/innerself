import {createStore} from "../index";
import withLogger from "../logger";
import reducer from "./reducer"


const { attach, connect, dispatch } =
    createStore(withLogger(reducer));

window.dispatch = dispatch;

export { attach, connect };
