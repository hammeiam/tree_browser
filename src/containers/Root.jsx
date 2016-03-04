import React, {Component} from 'react'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'

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

const store = configureStore(initialState)

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