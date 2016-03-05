import expect from 'expect'
import {AppView} from '../src/containers/App'
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
			children: [0], 
			collapsed: false
		}
	}
	Object.keys(nodes).forEach(id => {
		nodes[id]['nodes'] = nodes
	})
	let defaultProps = {
		topLevel: [0],
		nodes,
		handleClick: () => {}
	}
	let props = Object.assign({}, defaultProps, otherProps)
	let renderer = TestUtils.createRenderer()
	renderer.render(<AppView {...props} />)
	let result = renderer.getRenderOutput()

	return {
		result,
		renderer
	}
}

describe('App', () => {
	it('renders a topLevel node', () => {
		const { result, renderer } = shallowSetup()
		const tbodyElement = result.props.children
		const rowElements = tbodyElement.props.children
		const nodeElements = rowElements[1]

		expect(nodeElements.length).toBe(1)
	})

	it('renders many topLevel nodes', () => {
		const props = {
			topLevel: [0,1]
		}
		const { result, renderer } = shallowSetup(props)
		const tbodyElement = result.props.children
		const rowElements = tbodyElement.props.children
		const nodeElements = rowElements[1]
		
		expect(nodeElements.length).toBe(2)
	})

	it('renders many nodes recursively', () => {
		const props = {
			topLevel: [2]
		}
		const { result, renderer } = shallowSetup(props)
		const tbodyElement = result.props.children
		const rowElements = tbodyElement.props.children
		const nodeElements = rowElements[1]
		
		expect(nodeElements.length).toBe(2)
	})

	it('renders no topLevel nodes', () => {
		const props = {
			topLevel: []
		}
		const { result, renderer } = shallowSetup(props)
		const tbodyElement = result.props.children
		const rowElements = tbodyElement.props.children
		const nodeElements = rowElements[1]
		
		expect(nodeElements.length).toBe(0)
	})
})