import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Template } from './components'
import store from './store'
import './styles.css'

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Template />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
