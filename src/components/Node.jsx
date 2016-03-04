import React, { Component, PropTypes } from 'react'

const Node = ({id, name, children, collapsed, onClick, nodes}) => {
	let childNodes = null
	if(!collapsed){
		childNodes = <ul>
			{children.map((id) => {
				const node = nodes[id]
				return <Node {...node} onClick={() => onClick(node.id, node.collapsed)} nodes={nodes} key={node.id} />
			})}
		</ul>
	}
	return (
		<li className='nodeWrapper'>
			<div className='nodeInfo' onClick={() => onClick(id, collapsed)}>
				<span>Name: {name}</span>
				{' '}
				<span>Type: {children.length ? 'Folder' : 'File'}</span>
			</div>
			{childNodes}
		</li>
	)
}

Node.proptypes = {
	id: PropTypes.number.isRequired, 
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired, 
	children: PropTypes.array, 
	collapsed: PropTypes.bool
}

export default Node

