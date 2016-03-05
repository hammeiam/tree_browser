import React, { PropTypes } from 'react'

const Node = ({id, name, classProp, children, collapsed, onClick, depth}) => {
	let clickFn = null
	let fileClass = children.length ? 'folder' : 'file'
	let classNames = [fileClass, classProp]
	if(children.length){
		let openClass = collapsed ? 'closed' : 'open'
		classNames.push(openClass)
		clickFn = () => onClick(id, collapsed)
	}

	return (
		<tr className={classNames.join(' ')} 
				onClick={clickFn}>
			<td style={{paddingLeft: depth * 15}}>{name}</td>
			<td>{children.length ? 'Folder' : 'File'}</td>
			<td>{depth}</td>
		</tr>
	)
}

Node.proptypes = {
	id: PropTypes.string.isRequired, 
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired, 
	children: PropTypes.array.isRequired, 
	collapsed: PropTypes.bool
}

export default Node

