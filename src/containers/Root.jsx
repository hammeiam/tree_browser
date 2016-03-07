import React, { Component } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { addNode } from '../actions'

const store = configureStore()

// helper functions for adding files via console
window.addFile = function(file) {
  store.dispatch(addNode(file))
}

window.addGeneratedFiles = function(numFiles = 20) {
  const words = ['Applications', 'Contents', 'Plugins', 'Media', ':C', 'Documents', 'Drive', 'Dropbox', 'Public', 'Templates', 'Root', 'Library', 'Media', 'random\\ thoughts']
  const extensions = ['.js', '.exe', '.rb', '.json', '.pkg', '.docx', '.txt']
  for (let i = 0; i < numFiles; i++) {
    let start = Math.floor(Math.random() * (words.length - 2))
    let count = Math.floor(Math.random() * (words.length - 1 - start)) + 1
    let exIdx = Math.floor(Math.random() * (extensions.length - 1))
    let path = words.slice(start, start + count).join(start + '/')
    addFile(path + extensions[exIdx])
  }
}

// starter data
addFile('foo/file1.js')
addFile('foo/bar/file2.js')
addFile('foo/bin/file3.js')
addFile('foo/bin/random\ stuff/file4.js')
addFile('foo/bin/work\\/professional/resume.txt')

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