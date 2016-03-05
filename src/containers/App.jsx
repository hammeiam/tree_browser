import React, {Component} from 'react'
import {connect} from 'react-redux'
import Node from '../components/Node'
import {updateNode} from '../actions'
import './app.less'

export const AppView = ({topLevel, nodes, handleClick}) => {
	return (
		<div className='main'>
			<ul>
				{(topLevel).map((id) => {
					const node = nodes[id]
					return <Node 
						{...node} 
						key={node.id} 
						nodes={nodes}
						onClick= {handleClick}
					/>
				})}
			</ul>
		</div>
	)
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
			dispatch(updateNode(nodeId, {collapsed: !collapsed}))
		}
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default App