import React, { PropTypes } from 'react'

const Node = ({ id, name, classNames = [], children, collapsed, onClick, depth }) => {
	let clickFn = null

	if (children.length) {
		clickFn = () => onClick(id, collapsed)
	}

	return (
		<div className={classNames.join(' ') + ' row node'}
				onClick={clickFn}>
			<div className='cell' style={{paddingLeft: depth * 15}}>
				{name.replace('\\','')}
			</div>
			<div className='cell'>
				{children.length ? 'Folder' : 'File'}
			</div>
			<div className='cell'>
				{depth}
			</div>
		</div>
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

