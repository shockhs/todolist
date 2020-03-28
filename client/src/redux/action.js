export const PUT_DATA = 'profile/PUT_DATA';
export const CALL_ERROR = 'profile/CALL_ERROR';
export const LOAD_DATA = 'profile/LOAD_DATA';
export const CLEAR_DATA = 'profile/CLEAR_DATA'
export const CLEAR_ERROR = 'profile/CLEAR_ERROR'

export const putData = (userData) => {
    return {
        type: PUT_DATA,
        data: userData
    }
}
export const callError = (error) => {
    return {
        type: CALL_ERROR,
        data: {
            error
        }
    }
}
export const callExit = () => {
    return {
        type: CLEAR_DATA,
    }
}

export const clearErrorMessage = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const loadData = (body) => {
    return {
        type: LOAD_DATA,
        data: body
    }
}