const Client = require('./client').FructoseClient;

const c = new Client();

c.loadComponent('Component1', {})
.then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {})).then( () => c.loadComponent('Component2', {}))
.then( () => c.loadComponent('Component1', {}))
.then( () => c.loadComponent('Component2', {}))
.then( () => c.disconnect());
