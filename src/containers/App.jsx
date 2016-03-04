import React, {Component} from 'react'
import {connect} from 'react-redux'
import Node from '../components/Node'
import {updateNode} from '../actions'

// const App = ({topLevel, nodes, handleClick}) => {
// 	return (
// 		<div className='main'>
// 			<ul>
// 				{(topLevel).map((id) => {
// 					const node = nodes[id]
// 					return <Node 
// 						{...node} 
// 						key={node.id} 
// 						onClick= {handleClick}
// 					/>
// 				})}
// 			</ul>
// 		</div>
// 	)
// }

class App extends Component {
	render() { 
		const {topLevel, nodes, handleClick} = this.props
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
			console.log('app clicked')
			dispatch(updateNode(nodeId, {collapsed: !collapsed}))
		}
  }
}

const MyApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default MyApp