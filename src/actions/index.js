export const UPDATE_NODE = 'UPDATE_NODE'
export const ADD_NODE = 'ADD_NODE'


function parsePath(str){
	var output = []
	var temp = ''
	var flag = false
	for(var i = 0; i<str.length; i++){
		var char = str[i]
		if(!flag){
			if(char === '\\'){
				flag = true
			} else if(char === '/'){
				output.push(temp)
				temp = ''
			} else {
				temp += char
			}
		} else {
			temp += char
		}
	}
	output.push(temp)
	return output
}

export function addNode(path){
	return {
		type: ADD_NODE,
		fullPath: path,
		pathParts: parsePath(path)
	}
}

export function updateNode(nodeId, node){
	return {
		type: UPDATE_NODE,
		nodeId,
		node
	}
}