/*
 * Test Setup:
 * - Creates window and document globals need to render components
 * - exposes #shallowSetup helper
*/

import 'babel-polyfill'
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils'
import React from 'react'


const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

global.shallowSetup = function(Component) {
  /*
  * A curried function used to set up test components.
  *
  * shallowSetup(React_Component) will return an object containing
  * a list of nodes that can be accessed, and the #init function.
  *
  * init(defaultProps, testSpecificProps) will return the rendered
  * component and the TestUtils shallow renderer itself.
  */

  const nodes = {
    'top1': {
      id: 'top1',
      name: 'top1',
      onClick: () => {},
      children: [],
      collapsed: false
    },
    'top2': {
      id: 'top2',
      name: 'top2',
      onClick: () => {},
      children: [],
      collapsed: false
    },
    'top3': {
      id: 'top3',
      name: 'top3',
      onClick: () => {},
      children: ['top3/middle1'],
      collapsed: false
    },
    'top3/middle1': {
      id: 'top3/middle1',
      name: 'middle1',
      onClick: () => {},
      children: [],
      collapsed: false
    }
  }

  Object.keys(nodes).forEach(id => {
    nodes[id]['nodes'] = nodes
  })

  let init = (defaultProps, userProps) => {
    let finalProps = Object.assign({}, defaultProps, userProps)
    let renderer = TestUtils.createRenderer()
    renderer.render(<Component {...finalProps} />)
    let result = renderer.getRenderOutput()

    return {
      result,
      renderer
    }
  }

  return {
    nodes,
    init
  }
}