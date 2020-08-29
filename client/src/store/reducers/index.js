import { SAVE_AUTH, CALL_ERROR, CLEAR_DATA, CLEAR_ERROR } from '../actions'

const initialState = {
    id: null,
    email: null,
    name: null,
    token: null,
    authStatus: null,
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
        case SAVE_AUTH:
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
