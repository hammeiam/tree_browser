# David Hamme's Tree Browser

## Get Started:
- clone the repo
- run `npm install`
- run `npm run dev` to start the dev server on port 3001
- run `npm run test` to perform tests
- from the dev console, add new files with either:
`window.addGeneratedFiles(number_of_files)`  or
`window.addFile('Users/admin/fat32/not\ a\ virus.exe')`

Problems? Make sure you have a modern version of Node (5+) and npm (3.7+). Try `npm cache clean` as well. 

## Data Flow:
This app follows the basic redux pattern. 

Actions are objects with payloads of information that are created by actionCreators. They look like {type: 'SOME_ACTION', payload1: [], payload2: ''}

Actions are processed by Reducers, which are functions that know how to modify the state of the app based on a type of action. 

Application state is represented as a single object which is maintained by a redux Store. The store instance exposes `getState` for reading state, `dispatch(action)` for modifying state, and `un/subscribe(listener)` for handling listeners. A store is instantiated with a reducer.

Thus the flow of data looks like this:

store.dispatch(action) -> 
processed by reducer -> 
updates state in store ->
store invokes listeners to update views

`react-redux` provides some convenience methods for wiring up an app to avoid boilerplate code which you can read about [here.](http://redux.js.org/docs/basics/UsageWithReact.html#container-components) 


## Structure:
### Components

**index.html**

Static html page that loads the bundle

**Root.jsx**

React component that creates a Redux store and connects it to our application by wrapping our App component in the Redux Provider component.

**App.jsx**

Renders the top level nodes and passes state and a click handler down to child nodes to handle visibility toggling. Employs Depth First Search to recursively flatten all children to prepare them for rendering.  

**Node.jsx**

React component that renders information about a piece of data. Labels the data as either a file or folder depending on if it has children. 

### Configure Store
Returns a store object built from our reducer, and initial state. Allows for debugging through Redux Dev Tools if they exist on the window

### Reducer
Tells the store how to handle incoming actions. Currently only handles UPDATE_NODE for visibility toggling, but will eventually handle adding and removing nodes as well. 

### Actions
Exports both actions constants and action creators that provide information to our reducer. 
