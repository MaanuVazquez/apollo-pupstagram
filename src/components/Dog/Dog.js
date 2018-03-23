// @flow
import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {capitalizeWord} from '../../utils'
import DogImage from './DogImage'
import styles from './styles.css'
import type {MutationOptions} from 'react-apollo'

type DogType = {
  breed: string,
  displayImage: string,
  id: string,
  images: ImageType[]
}

type ImageType = {
  id: string,
  isLiked: boolean,
  url: string
}

type Props = {
  dog: DogType,
  error: boolean,
  likeAPhoto: (MutationOptions) => void,
  loading: boolean
}

export default class Dog extends Component<Props> {
  renderDogImages = () => {
    const {dog: {images}, likeAPhoto} = this.props
    return images.map(image => <DogImage key={image.id} image={image} onLikeAPhoto={likeAPhoto}/>)
  }

  render() {
    const {loading, error, dog} = this.props
    if (loading) return <h1>Fetching dogo 🐶 🐶 🐶</h1>
    if (error) return <div>Error: {error}</div>
    const {breed, displayImage} = dog
    return (
      <Fragment>
        <div className={styles.puppyInfoBlock}>
          <div className={styles.puppyInfo}>
            <img className={styles.puppyImage} src={displayImage} alt={breed}/>
            <p>{capitalizeWord(breed)}</p>
          </div>
          <Link to='/' className={styles.puppyLinkBack}>👈</Link>
        </div>
        <div/>
        {this.renderDogImages()}
      </Fragment>
    )
  }
}
