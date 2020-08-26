import { apiURL } from '../constants'

class AuthProvider {
    apiURL = `${apiURL}/user`

    getOptions = ({ method, body }) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        return options
    }

    registerUser = ({ name, email, password }) => {
        return fetch(`${this.apiURL}/register`, this.getOptions({ method: 'POST', body: { name, email, password } }))
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    return { status: false, error: res.error }
                } else {
                    return { status: true }
                }
            })
    }
}

export default new AuthProvider()
