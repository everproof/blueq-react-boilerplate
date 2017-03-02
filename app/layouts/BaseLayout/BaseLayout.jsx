import React, { PropTypes } from 'react'

import { container } from './styles'

export default function BaseLayout ({ children }) {
  return (
    <div className={container}>
      {children}
    </div>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
