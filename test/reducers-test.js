import expect from 'expect'
import rootReducer from '../src/reducers'
import {ADD_NODE, UPDATE_NODE} from '../src/actions'


describe('reducers', () => {
	it('should add new node to nodes list', () => {
		const action = {
			type: ADD_NODE,
			fullPath: 'foo/bang.js',
			pathParts: ['foo','bang.js']
		}
		const state = {
			topLevel: ['foo'],
			nodes: {
				'foo': {
					id: 'foo',
					name: 'foo',
					children: []
				}
			}
		}
		expect(rootReducer(state, action)).toEqual({
			topLevel: ['foo'],
			nodes: {
				'foo': {
					id: 'foo',
					name: 'foo',
					children: ['foo/bang.js']
				},
				'foo/bang.js': {
					id: 'foo/bang.js',
					name: 'bang.js',
					children: []
				}
			}
		})
	})

	it('should add new node to the topLevel', () => {
		const action = {
			type: ADD_NODE,
			fullPath: 'foo/bang.js',
			pathParts: ['foo','bang.js']
		}

		expect(rootReducer(undefined, action)).toEqual({
			topLevel: ['foo'],
			nodes: {
				'foo': {
					id: 'foo',
					name: 'foo',
					children: ['foo/bang.js']
				},
				'foo/bang.js': {
					id: 'foo/bang.js',
					name: 'bang.js',
					children: []
				}
			}
		})
	})

	it('should update a node', () => {
		const action = {
			type: UPDATE_NODE,
			nodeId: 'foo',
			node: {collapsed: true}
		}
		const state = {
			topLevel: ['foo'],
			nodes: {
				foo: {
					id: 'foo',
					name: 'foo',
					children: []
				}
			}
		}

		expect(rootReducer(state, action)).toEqual({
			topLevel: ['foo'],
			nodes: {
				'foo': {
					id: 'foo',
					name: 'foo',
					collapsed: true,
					children: []
				}
			}
		})
	})
})