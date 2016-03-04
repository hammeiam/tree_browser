# David Hamme's Tree Browser

## Get Started:
- clone the repo
- run `npm install`
- run `npm run dev` to start the dev server on port 3001
- run `npm run test` to perform tests

## Structure:
### Components
**index.html**
Static html page that loads the bundle

**Root.jsx**
React component that creates a Redux store and connects it to our application by wrapping our App component in the Redux Provider component.

**App.jsx**
Renders the top level nodes and passes state and a click handler down to child nodes to handle visibility toggling.

**Node.jsx**
The hard worker. React component that renders information about a piece of data. Labels the data as either a file or folder depending on if it has children. Recursively renders children if they exists. 

### Configure Store
Returns a store object built from our reducer, and initial state. Allows for debugging through Redux Dev Tools if they exist on the window

### Reducer
Tells the store how to handle incoming actions. Currently only handles UPDATE_NODE for visibility toggling, but will eventually handle adding and removing nodes as well. 

### Actions
Exports both actions constants and action creators that provide information to our reducer. 
