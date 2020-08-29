import React from 'react'
import ListElements from '../src/components/TodoList/ListElements'
import { shallow } from 'enzyme'

describe('inputField', () => {
    it('render correct list in component', () => {
        const component = shallow(<ListElements todoList={[]} />)
        const listEmptyLength = component.find('.todoList-elements').length

        const component2 = shallow(
            <ListElements
                todoList={[
                    { _id: '1111', title: 'Test' },
                    { _id: '11112', title: 'Test2' },
                ]}
            />
        )
        const listNotEmptyLength = component2.find('.todoList-elements').length

        expect(listEmptyLength).toBe(0)
        expect(listNotEmptyLength).toBe(2)
    })
})
