import expect from 'expect'
import Node from '../src/components/Node'
import React from 'react'
import TestUtils, {renderIntoDocument} from 'react-addons-test-utils'

function shallowSetup(otherProps) {
	let nodes = {
		0:{
			id: 0, 
			name: 'node0',
			onClick: () => {}, 
			children: [], 
			collapsed: false
		},
		1: {
			id: 1, 
			name: 'node1',
			onClick: () => {}, 
			children: [], 
			collapsed: false
		},
		2: {
			id: 2, 
			name: 'node2',
			onClick: () => {}, 
			children: [], 
			collapsed: false
		}
	}
	Object.keys(nodes).forEach(id => {
		nodes[id]['nodes'] = nodes
	})
	let defaultProps = nodes[0]
	let props = Object.assign({}, defaultProps, otherProps)
	let renderer = TestUtils.createRenderer()
	renderer.render(<Node {...props} />)
	let result = renderer.getRenderOutput()

	return {
		result,
		renderer
	}
}

describe('Node', () => {

	it('is a folder when it has children', () => {
		const props = {
			children: [1,2]
		}
		const { result, renderer } = shallowSetup(props)
		const nodeType = result.props.children[1]
		
		expect(nodeType.props.children).toInclude('Folder')
	})

	it('is a file when it doesn\'t have children', () => {
		const { result, renderer } = shallowSetup()
		const nodeType = result.props.children[1]
		
		expect(nodeType.props.children).toInclude('File')
	})

	it('has a click handler when it has children', () => {
		let clickCounter = 0
		const props = {
			children: [1,2],
			onClick: function(){clickCounter++}
		}
		const { result, renderer } = shallowSetup(props)

		result.props.onClick()
		expect(clickCounter).toBe(1)
	})

	it('has no click handler without children', () => {
		const { result, renderer } = shallowSetup()
		
		expect(result.props.onClick).toNotExist()
	})

})