import './styles.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Template } from './components'
import store from './store'

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Template />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
