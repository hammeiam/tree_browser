import expect from 'expect'
import { Provider } from 'react-redux'
import configureStore from '../src/configureStore'
import App, { AppView } from '../src/containers/App'
import Node from '../src/components/Node'
import React from 'react'
import TestUtils, {
  Simulate,
  renderIntoDocument,
  isElement,
  isCompositeComponent,
  isCompositeComponentWithType,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'

function setup(state) {
  const store = configureStore(state)
  const providerElement = renderIntoDocument(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const appElement = findRenderedComponentWithType(providerElement, App)
  const appViewElement = findRenderedComponentWithType(providerElement, AppView)
  // can't use ComponentsWithType for Node because it's stateless.
  const nodeElements = scryRenderedDOMComponentsWithClass(appViewElement, 'node')

  return {
    store,
    providerElement,
    appElement,
    appViewElement,
    nodeElements
  }
}

describe('Integration Test', () => {
  it('should connect the state to the application', () => {
    const { providerElement, appElement, appViewElement } = setup()

    // Provider passes store as context to App which converts it to props for AppView
    expect(isCompositeComponentWithType(providerElement, Provider)).toBe(true)
    expect(Object.keys(appElement.context)[0]).toEqual('store')
    expect(Object.keys(appViewElement.props)).toEqual(['topLevel', 'nodes', 'handleClick'])
  })

  it('should render App component', () => {
    const { appViewElement } = setup()
    const headers = scryRenderedDOMComponentsWithClass(appViewElement, 'rowHeader')

    expect(isCompositeComponentWithType(appViewElement, AppView)).toBe(true)
    expect(headers.length).toBe(3)
    expect(headers[0].firstChild.textContent).toBe('Name')
    expect(headers[1].firstChild.textContent).toBe('Type')
    expect(headers[2].firstChild.textContent).toBe('Depth')
  })

  it('should render nodes from the state', () => {
    const state = Object.assign(
      {},
      defaultState,
      {
        topLevel: ['top1', 'top2']
      }
    )
    const { nodeElements } = setup(state)
    const firstNodeData = state.nodes['top1']
    const firstNodeEl = nodeElements[0]
    const firstNodeElName = firstNodeEl.childNodes.item(0).textContent
    const firstNodeElType = firstNodeEl.childNodes.item(1).textContent
    const firstNodeElDepth = firstNodeEl.childNodes.item(2).textContent

    expect(nodeElements.length).toBe(state.topLevel.length)
    expect(firstNodeElName).toBe(firstNodeData.name)
    expect(firstNodeElType).toBe(firstNodeData.children.length ? 'Folder' : 'File')
    expect(firstNodeElDepth).toBe(firstNodeData.depth.toString())
  })

  it('should update the state when nodes are toggled via click event', () => {
    const state = Object.assign(
      {},
      defaultState,
      {
        topLevel: ['top3'] // top3 is a folder
      }
    )
    const { nodeElements } = setup(state)
    const nodeEl = nodeElements[0]

    expect(nodeEl.getAttribute('class')).toInclude('open')

    Simulate.click(nodeEl)

    expect(nodeEl.getAttribute('class')).toInclude('closed')
  })
})