import React, {Component} from 'react'
import {connect} from 'react-redux'
import Node from '../components/Node'
import {updateNode} from '../actions'
import './app.less'


export class AppView extends Component {
	runner(node, nodes){
		if(node.children.length === 0 || node.collapsed){ return [node]}
		return node.children.map(id => this.runner(nodes[id], nodes)).reduce((prevArr, nextArr) => {
				return prevArr.concat(nextArr)
			},[node])
		return [node].concat(rec)
	}

	dfs(top, nodes){
		let out = []
		top.forEach(id => {
			let node = nodes[id]
			out = out.concat(this.runner(node, nodes))
		})
		return out
	}
	componentDidMount() {

	}

	render() {
		
		const {topLevel, nodes, handleClick} = this.props
		let topNodes = this.dfs(topLevel, nodes)

		return (
			<table className='main'>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Depth</th>
					</tr>
					{(topNodes).map((node,i) => {
						return <Node 
							{...node} 
							classProp={i%2 === 0 ? 'even' : 'odd'}
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
			dispatch(updateNode(nodeId, {collapsed: !collapsed}))
		}
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default App