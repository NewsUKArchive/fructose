import log from 'npmlog';
import createWithComponentGlobal from './withComponent';
import hooks from "./setup";

const fructose = {};
fructose.withComponent = createWithComponentGlobal;
fructose.hooks = hooks();

export default fructose;
