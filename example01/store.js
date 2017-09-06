import { create_store, logger } from "../dist/innerself.js";
import reducer from "./reducer"

const { attach, connect, dispatch } =
    create_store(logger(reducer));

window.dispatch = dispatch;

export { attach, connect };
