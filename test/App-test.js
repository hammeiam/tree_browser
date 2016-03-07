import expect from 'expect'
import { AppView } from '../src/containers/App'
import Node from '../src/components/Node'
import React from 'react'
import TestUtils, { renderIntoDocument, isElement } from 'react-addons-test-utils'

function setup(props){
  const setupVars = shallowSetup(AppView)
  // props should look like the store
  const defaultProps = {
    topLevel: ['top1'],
    nodes: setupVars.nodes,
    handleClick: () => {}
  }
  return setupVars.init(defaultProps, props)
}

describe('App', () => {
  it('renders a topLevel node', () => {
    const {result, renderer} = setup()
    const rowElements = result.props.children
    const nodeElements = rowElements[1]

    expect(typeof nodeElements[0].type).toBe('function')
    expect(nodeElements.length).toBe(1)
  })

  it('renders many topLevel nodes', () => {
    const props = {
      topLevel: ['top1','top2']
    }
    const {result, renderer} = setup(props)
    const rowElements = result.props.children
    const nodeElements = rowElements[1]

    expect(typeof nodeElements[0].type).toBe('function')
    expect(nodeElements.length).toBe(2)
  })

  it('renders many nodes recursively', () => {
    const props = {
      topLevel: ['top3']
    }
    const {result, renderer} = setup(props)
    const rowElements = result.props.children
    const nodeElements = rowElements[1]

    expect(typeof nodeElements[0].type).toBe('function')
    expect(nodeElements.length).toBe(2)
  })

  it('renders no topLevel nodes', () => {
    const props = {
      topLevel: []
    }
    const {result, renderer} = setup(props)
    const rowElements = result.props.children
    const nodeElements = rowElements[1]

    expect(nodeElements.length).toBe(0)
  })
})