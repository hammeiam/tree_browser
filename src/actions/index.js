export const UPDATE_NODE = 'UPDATE_NODE'
export const ADD_NODE = 'ADD_NODE'

function parsePath(str){
	let output = []
	let temp = ''
	let flag = false
	for(let i = 0; i<str.length; i++){
		let char = str[i]
		if(!flag){
			if(char === '/'){
				output.push(temp)
				temp = ''
				continue
			} else if(char === '\\'){
				flag = true
			}
		} else {
			flag = false
		}
		temp += char
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