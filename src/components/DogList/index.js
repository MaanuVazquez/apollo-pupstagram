// @flow
import React from 'react'
import {Query} from 'react-apollo'
import query from './graphql/getDogs.graphql'
import classNames from 'classnames'
import DogItem from './DogItem'

const DogList = () => {
  const queryProps = {
    query
  }

  return (
    <Query {...queryProps}>
      {({loading, error, data: {dogs}}) => {
        if (loading) return <h1>Fetching dogs 🐶 🐶 🐶</h1>
        if (error) return <div>Error: {error}</div>
        return dogs.map(({id, breed, displayImage}) => (
          <div key={id} className={classNames('fl', 'w-10')}>
            <DogItem breed={breed} displayImage={displayImage}/>
          </div>
        ))
      }}
    </Query>
  )
}

export default DogList
