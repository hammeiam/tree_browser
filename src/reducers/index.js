import { combineReducers } from 'redux'
import { UPDATE_NODE, ADD_NODE } from '../actions'


function topLevel(state = [], action){
	// TODO: add things to top level
	switch(action.type){
		case ADD_NODE:
			let newState = state.slice()
			if(!newState.includes(action.pathParts[0])){
				newState.push(action.pathParts[0])
			}
			return newState
		default:
			return state
	}
}

function addNode(state, action){
	let parts = action.pathParts
	let newNodes = Object.assign(
		{}, 
		state,
		{ [action.fullPath]: 
			{
				id: action.fullPath,
				name: parts[parts.length - 1],
				children: []
			}
		}
	)

	for(let i = parts.length - 2; i >= 0; i--){
		let lastPath = parts.slice(0,i+2).join('/')
		let currentPath = parts.slice(0,i + 1).join('/')
		
		if(newNodes[currentPath]){
			newNodes[currentPath]['children'].push(lastPath)
			break
		} else {
			newNodes[currentPath] = {
				id: currentPath,
				name: parts[i],
				children: [lastPath]
			}
		}
	}
	return newNodes
}

function nodes(state = {}, action){
	// TODO: delete child from parent
	switch(action.type){
		case ADD_NODE:
			return addNode(state, action)
		case UPDATE_NODE:
			let newNode = Object.assign(
				{},
				state[action.nodeId],
				action.node
			)
			return Object.assign(
				{}, 
				state, 
				{ [action.nodeId]: newNode }
			)
		default:
			return state
	}
}

const rootReducer = combineReducers({
	topLevel,
	nodes
})

export default rootReducer