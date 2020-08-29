import React from 'react'
import LoginFormConnected, { LoginForm } from '../src/components/LoginForm'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'

describe('inputField', () => {
    const initialState = {
        id: null,
        email: null,
        name: null,
        token: null,
        authStatus: false,
        errorMessage: '',
    }

    const mockStore = configureStore()
    const loginActionCreate = jest.fn()

    let store
    let wrapper

    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = mount(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginFormConnected login={loginActionCreate} />
                </Provider>
            </BrowserRouter>
        )
    })
    it('render the connected component', () => {
        expect(wrapper.find(LoginFormConnected).length).toEqual(1)
    })

    it('check prop matches with initialState value', () => {
        expect(wrapper.find(LoginForm).prop('authStatus')).toEqual(initialState.authStatus)
    })

    it('correct onchange working', () => {
        wrapper
            .find(LoginForm)
            .find('#email')
            .simulate('change', { target: { value: 'testing@mail.ru' } })
        wrapper
            .find(LoginForm)
            .find('#password')
            .simulate('change', { target: { value: 'testing' } })
        expect(wrapper.find(LoginForm).find('#email').props().value).toEqual('testing@mail.ru')
        expect(wrapper.find(LoginForm).find('#password').props().value).toEqual('testing')
    })

    it('error after submit without filling form', () => {
        wrapper.find(LoginForm).find('a').at(0).simulate('click')

        expect(wrapper.find(LoginForm).find('.errorMessage')).toBeTruthy()
    })
})
