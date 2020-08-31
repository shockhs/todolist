import { Redirect, Route } from 'react-router-dom'

import React from 'react'
import { RouteGuard } from './index'
import { shallow } from 'enzyme'

describe('RouteGuard', () => {
    it('should return redirect if not authenticated', () => {
        const component = shallow(<RouteGuard path="/home" authStatus={false} />)
        expect(component.find(Redirect)).toHaveLength(1)
    })
    it('should return children if authenticated', () => {
        const component = shallow(<RouteGuard path="/home" authStatus={true} />)
        expect(component.find(Route)).toHaveLength(1)
    })
})
