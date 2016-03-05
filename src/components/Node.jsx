import React, { PropTypes } from 'react'

const Node = ({id, name, classNames = [], children, collapsed, onClick, depth}) => {
	let clickFn = null
	
	if(children.length){
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
	collapsed: PropTypes.bool,
	classNames: PropTypes.arrayOf(PropTypes.string),
	depth: PropTypes.number.isRequired
}

export default Node

