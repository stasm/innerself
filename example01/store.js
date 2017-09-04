import { create_store, logger } from "../index.js";
import reducer from "./reducer"


const { attach, connect, dispatch } = create_store(
    logger(reducer));

window.dispatch = dispatch;

export { attach, connect, dispatch };
