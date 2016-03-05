import React, {Component} from 'react'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import {addNode} from '../actions'

const store = configureStore()

store.dispatch(addNode('foo/file1.js'))
store.dispatch(addNode('foo/bar/file2.js'))
store.dispatch(addNode('foo/bin/file3.js'))
store.dispatch(addNode('foo/bin/baz/file4.js'))

window.addFile = function(file){
	store.dispatch(addNode(file))
}

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