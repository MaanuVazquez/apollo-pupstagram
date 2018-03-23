// @flow
import React from 'react'
import classNames from 'classnames'
import {Query} from 'react-apollo'
import query from './graphql/getPhotosLiked.graphql'
import styles from './styles.css'

const Likes = () => {
  const queryProps = {
    query
  }

  return (
    <Query {...queryProps}>
      {({data: {likedPhotos}, error, loading}) => {
        if (loading) return <div>Loading... 📸</div>
        if (error) return <div>{error}</div>
        return likedPhotos.map(({id, url}) => (
          <div key={id} className={classNames('fl', 'w-20')}>
            <img src={url} alt={id} className={styles.puppyImage}/>
          </div>
        ))
      }}
    </Query>
  )
}

export default Likes
