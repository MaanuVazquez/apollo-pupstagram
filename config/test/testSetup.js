/* eslint-disable flowtype/require-valid-file-annotation */
const {JSDOM} = require('jsdom')
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

const dom = new JSDOM('')
global.document = dom.window.document
global.window = document.defaultView
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js',
  platform: 'MacIntel',
  appName: 'Netscape'
}

enzyme.configure({adapter: new Adapter()})
