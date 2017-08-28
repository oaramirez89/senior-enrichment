'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom';

import store from './store'
import MainPage from './components/MainPage'

render(
  <Provider store={store}>
    <Router>
      <MainPage />
    </Router>
  </Provider>,
  document.getElementById('main')
)
