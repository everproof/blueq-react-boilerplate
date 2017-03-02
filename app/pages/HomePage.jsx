import React, { PropTypes } from 'react'

import { MainLayout } from 'layouts'

export default function HomePage ({ route }) {
  return (
    <MainLayout header={route.header}>
      {'Home Page'}
    </MainLayout>
  )
}

HomePage.propTypes = {
  route: PropTypes.shape({
    header: PropTypes.string.isRequired,
  }).isRequired,
}
