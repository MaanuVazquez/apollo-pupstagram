// @flow
import React from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import classNames from 'classnames'
import styles from './styles.css'
import DogList from '../components/DogList'
import Dog from '../components/Dog'
import Likes from '../components/Likes'

const Routes = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Link to='/' className={styles.appTitle}>PUPSTAGRAM <span>🐶</span></Link>
        <Link to='/likes' className={styles.linkToLikes}>❤️</Link>
      </header>
      <div className={classNames('mt4')}>
        <Switch>
          <Route exact path='/' component={DogList}/>
          <Route exact path='/likes' component={Likes}/>
          <Route exact path='/:dogo' component={Dog}/>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

export default Routes
