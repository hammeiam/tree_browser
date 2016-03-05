import React, { PropTypes } from 'react'

const Node = ({id, name, children, collapsed, onClick, nodes}) => {
	let childNodes = null
	let clickFn = null
	let classNames = ['file']
	if(children.length){
		clickFn = () => onClick(id, collapsed)
		classNames = ['folder']
	}
	if(!collapsed){
		classNames.push('open')
		childNodes = <ul className='nodeChildren'>
			{children.map((id) => {
				const node = nodes[id]
				return <Node 
					{...node} 
					onClick={onClick} 
					nodes={nodes} 
					key={node.id} 
				/>
			})}
		</ul>
	}

	return (
		<li>
			<div className={classNames.join(' ')} onClick={clickFn}>
				<span>Name: {name}</span>
				{' '}
				<span>Type: {children.length ? 'Folder' : 'File'}</span>
			</div>
			{childNodes}
		</li>
	)
}

Node.proptypes = {
	id: PropTypes.string.isRequired, 
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired, 
	nodes: PropTypes.array.isRequired,
	children: PropTypes.array.isRequired, 
	collapsed: PropTypes.bool
}

export default Node

