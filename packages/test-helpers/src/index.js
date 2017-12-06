import createWithComponentGlobal from "./withComponent";
import hooks from "./setup";

createWithComponentGlobal();

const fructose = {};
fructose.hooks = hooks;

export default fructose;
