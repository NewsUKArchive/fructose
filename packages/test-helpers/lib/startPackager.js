"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.startPackager=exports.kill=undefined;var _child_process=require("child_process");var getCwd=function getCwd(){var forwardSlashesAfterRoot=process.cwd().substr(process.cwd().indexOf("e2eTests")).match(/\//g);var numForwardSlashes=forwardSlashesAfterRoot?forwardSlashesAfterRoot.length:0;var cwd=process.cwd();for(var i=0;i<numForwardSlashes;i+=1){cwd+="/..";}return cwd;};var handlePackager=function handlePackager(fructosePackager){return new Promise(function(resolve,reject){fructosePackager.stdout.on("data",function(d){if(d.toString("utf8").includes("Loading dependency graph, done.")){resolve(fructosePackager);}});fructosePackager.stderr.on("data",function(){});fructosePackager.on("close",function(code){if(code===11){console.log('Packager could not listen on port 8081');resolve("Packager can't listen on port 8081");}else if(code!==0){console.log("packager did not exit correctly: code "+code);resolve("closed with code "+code);}});});};var kill=exports.kill=function kill(packager){return new Promise(function(resolve){console.log('killing packager');packager.on("exit",function(){resolve();});packager.kill("SIGINT");});};var startPackager=exports.startPackager=function startPackager(){console.log("starting packager");var fructosePackager=(0,_child_process.spawn)("npm",["run","fructose-app"],{cwd:getCwd()});return handlePackager(fructosePackager);};