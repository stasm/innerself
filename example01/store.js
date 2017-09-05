import { create_store } from "../index";
import with_logger from "../logger";
import reducer from "./reducer"


const { attach, connect, dispatch } =
    create_store(with_logger(reducer));

window.dispatch = dispatch;

export { attach, connect };
