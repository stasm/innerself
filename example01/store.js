import {createStore} from "../index";
import with_logger from "../logger";
import reducer from "./reducer"


const { attach, connect, dispatch } =
    createStore(with_logger(reducer));

window.dispatch = dispatch;

export { attach, connect };
