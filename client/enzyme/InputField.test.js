import React from 'react'
import InputField from '../src/components/InputField'
import { shallow } from 'enzyme'

describe('inputField', () => {
    it('render correct value in input field', () => {
        const component = shallow(<InputField type="text" name="testing" value={'Testing value'} />)
        const input = component.find('input').prop('value')

        expect(input).toBe('Testing value')
    })

    it('call onChangeHandler after texting in input field', () => {
        const handleChange = jest.fn()
        const component = shallow(<InputField type="text" name="testing" handleChange={handleChange} value={'Testing value'} />)
        const input = component.find('input')

        input.simulate('change', { target: { value: 'Testing field!' } })

        expect(handleChange).toBeCalled()
    })
})
