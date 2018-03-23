// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import Routes from './Routes'
import {client} from 'model'

const mountDevRoot = () => {
  const Redbox = require('redbox-react').default
  const AppContainer = require('react-hot-loader').AppContainer
  const HotRoot = require('./Routes').default
  ReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <ApolloProvider client={client}>
        <HotRoot/>
      </ApolloProvider>
    </AppContainer>,
    window.document.getElementById('root')
  )
}

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Routes/>
    </ApolloProvider>,
    window.document.getElementById('root')
  )
} else {
  mountDevRoot()
}

if (module.hot) {
  // $FlowIssue
  module.hot.accept('./Routes', mountDevRoot)
}
