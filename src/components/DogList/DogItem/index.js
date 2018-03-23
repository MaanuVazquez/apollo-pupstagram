// @flow
import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {capitalizeWord} from '../../../utils'
import styles from './styles.css'

type DogItemProps = {
  breed: string,
  displayImage: string
}

const DogItem = (props: DogItemProps) => {
  const {breed, displayImage} = props
  return (
    <Link to={`/${breed}`} className={styles.dogLink}>
      <img className={styles.dogImage} src={displayImage} alt={breed}/>
      <h3 className={classNames('f3', 'lh-copy', 'tc')}>{capitalizeWord(breed)}</h3>
    </Link>
  )
}

export default DogItem
