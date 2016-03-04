export const UPDATE_NODE = 'UPDATE_NODE'

export function updateNode(nodeId, node){
	return {
		type: UPDATE_NODE,
		nodeId,
		node
	}
}