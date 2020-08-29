export const SAVE_AUTH = 'profile/SAVE_AUTH'
export const CALL_ERROR = 'profile/CALL_ERROR'
export const LOGIN = 'profile/LOGIN'
export const CLEAR_DATA = 'profile/CLEAR_DATA'
export const CLEAR_ERROR = 'profile/CLEAR_ERROR'

export const saveAuth = (userData) => {
    return {
        type: SAVE_AUTH,
        data: userData,
    }
}
export const callError = (error) => {
    return {
        type: CALL_ERROR,
        data: {
            error,
        },
    }
}
export const callExit = () => {
    return {
        type: CLEAR_DATA,
    }
}

export const clearErrorMessage = () => {
    return {
        type: CLEAR_ERROR,
    }
}

export const login = (body) => {
    return {
        type: LOGIN,
        data: body,
    }
}
