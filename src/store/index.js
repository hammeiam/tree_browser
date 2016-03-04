let store = {
	root: [0],
	nodes: {
		0: {
			id: 0,
			name: 'foo',
			children: [1,2],
			collapsed: false
		},
		1: {
			id: 1,
			name: 'bar',
			children: [3],
			collapsed: false
		},
		2: {
			id: 2,
			name: 'baz',
			children: [],
			collapsed: true
		},
		3: {
			id: 3,
			name: 'bin',
			children: [],
			collapsed: false
		}
	}
}

function getNodes(ids){
	return ids.map((id) => store['nodes'][id])
}

function updateNode(id, newNode){
	store['nodes'][id] = newNode;
}

export { store, getNodes, updateNode }