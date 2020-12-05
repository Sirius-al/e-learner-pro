import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reducers from './Reducers'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const Store = createStore(reducers, initialState, compose(applyMiddleware(thunk), composeEnhancer))

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);