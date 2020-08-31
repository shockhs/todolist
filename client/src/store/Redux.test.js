import * as actions from './actions'
import reducer from './reducers'

describe('store', () => {
    const initialState = {
        id: null,
        email: null,
        name: null,
        token: null,
        authStatus: null,
        errorMessage: '',
    }

    const userData = { id: '11', email: 'testing@mail.ru', name: 'test', token: 'test' }
    const state = {
        ...userData,
        authStatus: true,
        errorMessage: '',
    }

    describe('reducer', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, {})).toEqual(initialState)
        })
        it('should save new error message', () => {
            expect(reducer(undefined, { type: actions.CALL_ERROR, error: 'Some error' })).toEqual({
                ...initialState,
                errorMessage: 'Some error',
            })
        })
        it('should clear current state', () => {
            expect(reducer(state, { type: actions.CLEAR_DATA })).toEqual(initialState)
        })
    })
    describe('actions', () => {
        it('should create an action to save a authenticated user data', () => {
            const expectedAction = {
                type: actions.SAVE_AUTH,
                data: userData,
            }
            expect(actions.saveAuth(userData)).toEqual(expectedAction)
        })
    })
})
