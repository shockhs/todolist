import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import { watchLoadData } from './saga'

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

export default store
