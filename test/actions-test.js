import expect from 'expect'
import * as actions from '../src/actions'

describe('actions', () => {
	it('should create an action to update a node', () => {
		const expectedAction = {
			type: actions.UPDATE_NODE,
			nodeId: 'foo',
			node: {collapsed: true}
		}
		expect(actions.updateNode('foo', {collapsed: true})).toEqual(expectedAction)
	})

	it('should create an action to add a node', () => {
		const expectedAction = {
			type: actions.ADD_NODE,
			fullPath: 'foo/bar/bang.js',
			pathParts: ['foo','bar','bang.js']
		}
		expect(actions.addNode('foo/bar/bang.js')).toEqual(expectedAction)
	})
})