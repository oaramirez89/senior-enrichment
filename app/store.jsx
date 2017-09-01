import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store
