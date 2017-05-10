// @flow
import React from 'react'
import Helmet from 'react-helmet'

import styles from './Home.scss'

class Home extends React.Component {

  render(){
    return(
      <main className={styles.Home}>
        <Helmet title="Home" />
        <h1 className={"a_global_style_here" + " " + styles.this_is_a_test}>Home</h1>
        <a href="#" className={styles.btn}>I Am a Button</a>
        <a href="#" className={styles.btn2}>I Am a Button</a>
        <a href="#" className={styles.btn3}>I Am a Button</a>
      </main>
    )
  }
}

Home.displayName = 'Home'

export default Home
