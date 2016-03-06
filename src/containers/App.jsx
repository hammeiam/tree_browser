import React, { Component } from 'react'
import { connect } from 'react-redux'
import Node from '../components/Node'
import { updateNode } from '../actions'
import './app.less'

export class AppView extends Component {
  _dfs(node, nodes) {
    // Depth First Search.
    // Return flattened array of all visible child nodes.
    if (node.children.length === 0 || node.collapsed) {
      return [node]
    }
    return node.children.map(id => {
      return this._dfs(nodes[id], nodes)
    }).reduce((prevArr, nextArr) => {
      return prevArr.concat(nextArr)
    }, [node])
  }

  render() {
    const {topLevel, nodes, handleClick} = this.props
    let flattenedTree = topLevel.map(id => {
      return this._dfs(nodes[id], nodes)
    }).reduce((prevArr, nextArr) => {
      return prevArr.concat(nextArr)
    }, [])

    return (
      <table className='main'>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Depth</th>
					</tr>

					{(flattenedTree).map((node, i) => {
		        let evenClass = i % 2 === 0 ? 'even' : 'odd'
		        let fileClass = node.children.length ? 'folder' : 'file'
		        let nodeClasses = [evenClass, fileClass]

		        if (node.children.length) {
		          let openClass = node.collapsed ? 'closed' : 'open'
		          nodeClasses.push(openClass)
		        }

		        return <Node
		          {...node}
		          classNames={nodeClasses}
		          key={node.id}
		          onClick= {handleClick}
		          />
		       })}
				</tbody>
			</table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topLevel: state.topLevel,
    nodes: state.nodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(nodeId, collapsed) {
      dispatch(updateNode(nodeId, {
        collapsed: !collapsed
      }))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default App