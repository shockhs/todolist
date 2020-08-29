import { apiURL } from '../constants'
import { takeEvery, put, call } from 'redux-saga/effects'
import { LOGIN, saveAuth, callError } from './actions'

function loginFetch({ data }) {
    let { email, password } = data
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    }
    return fetch(`${apiURL}/user/login`, options).then((res) => res.json())
}

function* workerLoadData(data) {
    try {
        const res = yield call(loginFetch, data)
        if (res.resultCode === 0) {
            yield put(saveAuth(res))
        } else {
            yield put(callError(res.error))
        }
    } catch (e) {
        throw new Error(e)
    }
}

export function* watchLoadData() {
    yield takeEvery(LOGIN, workerLoadData)
}
