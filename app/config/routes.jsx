import React from 'react'
import { hashHistory, Route, Router } from 'react-router'

import { HomePage } from 'pages'

export default (
  <Router history={hashHistory}>
    <Route component={HomePage} header='BlueQ React Boilerplate' path='/' />
  </Router>
)
