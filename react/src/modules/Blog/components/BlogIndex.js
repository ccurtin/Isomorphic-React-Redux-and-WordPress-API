// @flow
import React from 'react'
import Helmet from 'react-helmet'

const BlogIndex = () => (
  <div>

    {/* will only show on the blog index page */}
    <Helmet>
      <title>Blog List</title>
      <body className="bodywrapper-blog bodywrapper-blog-index" />
    </Helmet>

    <h1>Blog</h1>
  </div>
)

BlogIndex.displayName = 'BlogIndex'

export default BlogIndex
