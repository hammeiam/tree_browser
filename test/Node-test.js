import expect from 'expect'
import Node from '../src/components/Node'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

function setup(props){
  const setupVars = shallowSetup(Node)
  // props are a specific node
  const defaultProps = setupVars['nodes']['top1']

  return setupVars.init(defaultProps, props)
}

describe('Node', () => {

  it('is a folder when it has children', () => {
    const props = {
      children: [1, 2]
    }
    const {result, renderer} = setup(props)
    const nodeType = result.props.children[1]

    expect(nodeType.props.children).toInclude('Folder')
  })

  it('is a file when it doesn\'t have children', () => {
    const {result, renderer} = setup()
    const nodeType = result.props.children[1]

    expect(nodeType.props.children).toInclude('File')
  })

  it('has a click handler when it has children', () => {
    let clickCounter = 0
    const props = {
      children: [1, 2],
      onClick: function() {
        clickCounter++
      }
    }
    const {result, renderer} = setup(props)

    result.props.onClick()
    expect(clickCounter).toBe(1)
  })

  it('has no click handler without children', () => {
    const {result, renderer} = setup()

    expect(result.props.onClick).toNotExist()
  })

  it('correctly displays escaped backslashes', () => {
    const props = {
      id: 'slash\\/name.js',
      name: 'slash\\/name.js'
    }
    const {result, renderer} = setup(props)
    const nodeName = result.props.children[0].props.children

    expect(nodeName).toEqual('slash/name.js')
  })

})