import createWithComponentGlobal, { disconnectClient } from "./withComponent";
import hooks from "./setup";

createWithComponentGlobal();

const fructose = {};
fructose.hooks = hooks;
fructose.hooks.disconnectClient = disconnectClient;

export default fructose;
