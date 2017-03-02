import React, { PropTypes } from 'react'

import { BaseLayout } from 'layouts'

import { content, title } from './styles'

export default function MainLayout ({ children, header }) {
  return (
    <BaseLayout>
      <div className={content}>
        <h1 className={title}>{header}</h1>
        {children}
      </div>
    </BaseLayout>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
}
