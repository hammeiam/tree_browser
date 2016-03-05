import React, {Component} from 'react'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import {addNode} from '../actions'

const initialState = {
	topLevel: [0],
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

const store = configureStore()

store.dispatch(addNode('foo/file1.js'))
store.dispatch(addNode('foo/bar/file2.js'))
store.dispatch(addNode('foo/bin/file3.js'))
store.dispatch(addNode('foo/bin/baz/file4.js'))



class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

export default Root