// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

import { fetchArticles, getArticles } from './redux'

import styles from './Blog.scss'

export const Blog = (props: Object) => {

  const { children, articles } = props

  return (
    <div className={ styles.Blog }>

      {/* will show on all nested blog pages unless overwritten */}
      <Helmet titleTemplate="%s | YOUR SITE KNOWLEDGE BASE MORE KEYWORDS" >
        <title>Show Me On SERPs, Put Keywords Here</title>
        <meta name="description" content="This is our blog" />
        <body className="bodywrapper-blog" />
      </Helmet>

      <aside className={ styles.overview }>
        <nav>
          <ul>
            { articles.map(({ slug, title }) => (
              <li key={ slug }>
                <Link to={ `/blog/${ slug }` }>{ title }</Link>
              </li>
            )) }
          </ul>
        </nav>
      </aside>
      <main className={ styles.article }>
        { children }
      </main>
    </div>
  )
}

Blog.displayName = 'Blog'

Blog.propTypes = {
  children: PropTypes.element.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
}

Blog.onEnter = ({ dispatch }) => dispatch(fetchArticles())

const mapStateToProps = state => ({
  articles: getArticles(state)
})

export default connect(mapStateToProps)(Blog)
