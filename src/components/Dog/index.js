// @flow
import React from 'react'
import {Query, Mutation} from 'react-apollo'
import getDog from './graphql/getDog.graphql'
import toggleLike from './graphql/toggleLike.graphql'
import DogComponent from './Dog'
import type {Match} from 'react-router-dom'

type Props = {
  match: Match
}

const Dog = ({match, ...rest}: Props) => {
  const queryProps = {
    query: getDog,
    variables: ({
      breed: match.params.dogo
    })
  }

  const mutationProps = {
    mutation: toggleLike
  }

  return (
    <Mutation {...mutationProps}>
      {likeAPhoto => (
        <Query {...queryProps}>
          {({data: {dog}, error, loading}) => {
            const dogProps = {dog, error, loading, likeAPhoto, ...rest}
            return <DogComponent {...dogProps}/>
          }}
        </Query>
      )}
    </Mutation>
  )
}

export default Dog
