import { PUT_DATA, CALL_ERROR, CLEAR_DATA, CLEAR_ERROR } from '../actions'

const initialState = {
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name'),
    token: localStorage.getItem('token'),
    authStatus: localStorage.getItem('authStatus'),
    errorMessage: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_DATA: {
            return {
                id: null,
                email: null,
                name: null,
                token: null,
                authStatus: null,
                errorMessage: '',
            }
        }
        case PUT_DATA:
            let { id, email, name, token } = action.data
            return {
                id,
                email,
                name,
                token,
                authStatus: true,
            }
        case CALL_ERROR:
            return {
                ...state,
                errorMessage: action.data.error,
                authStatus: false,
            }
        case CLEAR_ERROR: {
            return {
                ...state,
                errorMessage: '',
            }
        }
        default:
            return state
    }
}

export default reducer
