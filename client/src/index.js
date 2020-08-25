import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { Template } from './components'
import reducer from './store/reducers'
import { watchLoadData } from './store/saga'
import './styles.css'

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        throw new Error(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, persistedState, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(watchLoadData)

store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Template />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
