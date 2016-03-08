import { combineReducers } from 'redux'
import { UPDATE_NODE, ADD_NODE } from '../actions'


function topLevel(state = [], action) {
  switch (action.type) {
    case ADD_NODE:
      let newState = state.slice()

      if (!newState.includes(action.pathParts[0])) {
        newState.push(action.pathParts[0])
      }
      return newState
    case UPDATE_NODE:
    default:
      return state
  }
}

function addNode(state, action) {
  /*
  *	 Given a node to add, add the leaf node or replace one with the same name.
  *	 Then, go through each of the leaf's ancestors and add that node if it doesn't exist.
  *  Additionally, add each node to the list of children of its parent nodes.
  *  Break when we encounter a node that already exists.
  */
  let parts = action.pathParts
  let newNodes = Object.assign(
    {},
    state,
    {
      [action.fullPath]: {
        id: action.fullPath,
        name: parts[parts.length - 1],
        children: [],
        depth: parts.length
      }
    }
  )

  for (let i = parts.length - 2; i >= 0; i--) {
    let lastPath = parts.slice(0, i + 2).join('/')
    let currentPath = parts.slice(0, i + 1).join('/')

    if (newNodes[currentPath]) {
      if (!newNodes[currentPath]['children'].includes(lastPath)) {
        newNodes[currentPath]['children'].push(lastPath)
      }
      break
    } else {
      newNodes[currentPath] = {
        id: currentPath,
        name: parts[i],
        children: [lastPath],
        depth: i + 1
      }
    }
  }
  return newNodes
}

function updateNode(state, action){
  let newNode = Object.assign(
    {},
    state[action.nodeId],
    action.node
  )
  return Object.assign(
    {},
    state,
    {
      [action.nodeId]: newNode
    }
  )
}

function nodes(state = {}, action) {
  // TODO: delete child from parent
  switch (action.type) {
    case ADD_NODE:
      return addNode(state, action)
    case UPDATE_NODE:
      return updateNode(state, action)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  topLevel,
  nodes
})

export default rootReducer