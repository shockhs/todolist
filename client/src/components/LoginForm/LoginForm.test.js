import { LoginForm, mapStateToProps } from './index'

import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { mount } from 'enzyme'

jest.mock('../Spinner', () => jest.fn(() => 'spinner'))

describe('LoginForm', () => {
    describe('connect', () => {
        const store = {
            id: null,
            email: null,
            name: null,
            token: null,
            authStatus: false,
            errorMessage: '',
        }
        it('correct mapStateToProps', () => {
            expect(mapStateToProps(store)).toEqual({
                authStatus: false,
                errorMessage: '',
            })
        })
    })
    describe('component', () => {
        const login = jest.fn()
        const clearErrorMessage = jest.fn()
        let wrapper

        beforeEach(() => {
            wrapper = mount(
                <MemoryRouter>
                    <LoginForm login={login} clearErrorMessage={clearErrorMessage} />
                </MemoryRouter>
            )
        })

        it('disable button after submitting form', () => {
            wrapper.find('#email').simulate('change', { target: { value: 'testing@mail.ru' } })
            wrapper.find('#password').simulate('change', { target: { value: '123456' } })

            wrapper.find('#loginBtn').at(0).simulate('click')

            expect(wrapper.find('.spinner-clear')).toHaveLength(1)
            expect(wrapper.find('#loginBtn')).toHaveLength(0)
        })

        it('error after submit without filling form', () => {
            wrapper.find('#loginBtn').at(0).simulate('click')

            expect(wrapper.find('.errorMessage').text()).toEqual('Поля должны быть заполнены')
        })

        it('call submit handler with correct data', () => {
            wrapper.find('#email').simulate('change', { target: { value: 'testing@mail.ru' } })
            wrapper.find('#password').simulate('change', { target: { value: '123456' } })

            wrapper.find('#loginBtn').at(0).simulate('click')

            expect(login).toHaveBeenCalledWith({ email: 'testing@mail.ru', password: '123456' })
        })
    })
})
