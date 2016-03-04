import { combineReducers } from 'redux'
import { UPDATE_NODE } from '../actions'


function topLevel(state = [], action){
	// TODO: add things to top level
	switch(action.type){
		default:
			return state
	}
}

function nodes(state = {}, action){
	// TODO: delete child from parent
	switch(action.type){
		case UPDATE_NODE:
			let newNode = Object.assign({},state[action.nodeId],action.node)
			return Object.assign({}, state, { [action.nodeId]: newNode })
		default:
			return state
	}
}

const rootReducer = combineReducers({
	topLevel,
	nodes
})

export default rootReducer