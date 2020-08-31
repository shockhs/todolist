import React from 'react'
import ListElements from './ListElements'
import { shallow } from 'enzyme'

const todoList = [
    { _id: '1111', title: 'T' },
    { _id: '11112', title: 'T2' },
]

describe('TodoList', () => {
    it('render correct list in component', () => {
        const component = shallow(<ListElements todoList={[]} />)
        const listEmptyLength = component.find('.todoList-elements').length

        const component2 = shallow(<ListElements todoList={todoList} />)
        const listNotEmptyLength = component2.find('.todoList-elements').length

        expect(listEmptyLength).toBe(0)
        expect(listNotEmptyLength).toBe(2)
    })

    it('not render delete button if prop isDeleting is true', () => {
        const component2 = shallow(<ListElements todoList={todoList} isDeleting />)

        expect(component2.find('.todoList-elements-delete').length).toBe(0)
    })
})
