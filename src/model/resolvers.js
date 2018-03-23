/* eslint-disable */
import gql from 'graphql-tag'

export const defaults = {
  likedPhotos: []
}

type Image = {
  id: string,
  url: string
}

export const resolvers = {
  Image: {
    isLiked: () => false
  },
  Mutation: {
    toggleLikedPhoto: (_, {id}, {cache, getCacheKey}) => {
      const fragment = gql`
        fragment isLiked on Image {
          isLiked
          url
        }
      `
      const fragmentId = getCacheKey({id, __typename: 'Image'})
      const photo = cache.readFragment({
        fragment,
        id: fragmentId
      })

      cache.writeData({
        id: fragmentId,
        data: {
          ...photo,
          isLiked: !photo.isLiked
        }
      })

      const query = gql`
        {
          likedPhotos @client {
            url
            id
          }
        }
      `

      const {likedPhotos} = cache.readQuery({query})

      const data = {
        likedPhotos: photo.isLiked
          ? likedPhotos.filter(photo => photo.id !== id)
          : likedPhotos.concat([
            {url: photo.url, id, __typename: 'LikedPhoto'}
          ])
      }

      cache.writeData({data})
      return data
    }
  }
}
