import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import reducer from './redux/reducers/reducer';
import { BrowserRouter } from 'react-router-dom';
import { watchLoadData } from './redux/saga';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState)
  } catch (err) {
    (err)
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(watchLoadData);

store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
