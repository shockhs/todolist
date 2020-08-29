import React from 'react'
import { RouteGuard } from '../src/components/RouteGuard'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'

describe('inputField', () => {
    it('return redirect if not authenticated', () => {
        const component = shallow(<RouteGuard path="/home" authStatus={false} />)
        expect(component.find(Redirect)).toHaveLength(1)
    })
})
