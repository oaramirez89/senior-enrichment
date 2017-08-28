'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import MainPage from './components/MainPage'

render (
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('main')
)
