import InputField from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('InputField', () => {
    it('render correct value in input field', () => {
        const component = shallow(<InputField type="text" name="testing" value={'Testing value'} />)
        expect(component.find('input').prop('value')).toBe('Testing value')
    })

    it('call onChangeHandler after texting in input field', () => {
        const handleChange = jest.fn()
        const component = shallow(<InputField type="text" name="testing" handleChange={handleChange} value={'Testing value'} />)

        component.find('input').simulate('change', { target: { value: 'Testing field!' } })

        expect(handleChange).toHaveBeenCalledWith(`Testing field!`)
    })
})
