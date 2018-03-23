// @flow
import React, {Component} from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import type {MutationOptions} from 'react-apollo'

type Image = {
  id: string,
  isLiked: boolean,
  url: string
}

type DogImageProps = {
  image: Image,
  onLikeAPhoto: (MutationOptions) => void
}

export default class DogImage extends Component<DogImageProps> {
  onHeartClick = () => {
    const {onLikeAPhoto, image: {id}} = this.props
    onLikeAPhoto({variables: {id}})
  }

  render() {
    const {props: {image: {url, id, isLiked}}, onHeartClick} = this
    return (
      <div key={id} className={classNames('fl', 'w-20')}>
        <img className={styles.puppyLikableImage} src={url} alt={id}/>
        <span className={styles.puppyHeart} role='img' onClick={onHeartClick}>{isLiked ? '❤️' : '🖤'}</span>
      </div>
    )
  }
}
