// @flow
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'
import {withClientState} from 'apollo-link-state'
import {HttpLink} from 'apollo-link-http'
import {resolvers, defaults} from './resolvers'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers,
  defaults
})

export const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({uri: 'https://nx9zvp49q7.lp.gql.zone/graphql'})
  ]),
  cache
})
