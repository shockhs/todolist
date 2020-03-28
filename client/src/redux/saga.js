import { takeEvery, put, call } from 'redux-saga/effects'
import { LOAD_DATA, putData, callError } from './action'


function fetchData({ data }) {
    let { email, password } = data;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    };
    return fetch('https://react-todolist-application.herokuapp.com/api/user/login', options)
        .then(res => res.json())
}

function* workerLoadData(data) {
    try {
        const res = yield call(fetchData, data);
        if (res.resultCode === 0) {
            yield put(putData(res))
        } else {
            yield put(callError(res.error))
        }
    } catch (err) {
        console.log(err)
    }
}

export function* watchLoadData() {
    yield takeEvery(LOAD_DATA, workerLoadData)
}