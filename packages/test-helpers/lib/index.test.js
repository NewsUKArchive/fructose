"use strict";var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==="function"?Symbol.iterator:"@@iterator")==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==="function"?Symbol.prototype:"@@prototype")?"symbol":typeof obj;};test("index exports function as default",function _callee(){var fructose;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:fructose=require("./index").default;expect(typeof withComponent==="undefined"?"undefined":_typeof(withComponent)).toBe("function");expect(_typeof(fructose.hooks.mobile.setup)).toBe("function");expect(_typeof(fructose.hooks.mobile.cleanup)).toBe("function");expect(_typeof(fructose.hooks.web.setup)).toBe("function");expect(_typeof(fructose.hooks.web.cleanup)).toBe("function");case 6:case"end":return _context.stop();}}},null,undefined);});test("withComponent is set as global function",function(){var fructose=require("./index").default;expect(_typeof(global.withComponent)).toBe("function");});