import { apiURL } from '../constants'

class TodoProvider {
    apiURL = `${apiURL}/todo`

    getOptions = ({ method, userToken, body }) => {
        const options = {
            method,
            headers: {
                'auth-token': `${userToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        return options
    }

    getTodos = ({ userToken, userLogin }) => {
        return fetch(`${this.apiURL}/userLogin=${userLogin}`, this.getOptions({ method: 'GET', userToken })).then((res) =>
            res.json()
        )
    }

    getTasks = ({ todoId, userToken }) => {
        return fetch(`${this.apiURL}/task=${todoId}`, this.getOptions({ method: 'GET', userToken })).then((res) => res.json())
    }

    createTodo = ({ userToken, userLogin, todoTitle }) => {
        return fetch(
            this.apiURL,
            this.getOptions({ method: 'POST', userToken, body: { userLogin, title: todoTitle } })
        ).then((res) => res.json())
    }

    createTask = ({ userToken, todoId, task }) => {
        return fetch(`${this.apiURL}/task`, this.getOptions({ method: 'POST', userToken, body: { task, todoId } })).then((res) =>
            res.json()
        )
    }

    deleteTodo = ({ userToken, todoId }) => {
        return fetch(this.apiURL, this.getOptions({ method: 'DELETE', userToken, body: { todoId } })).then(
            (res) => res.status === 200
        )
    }

    deleteTask = ({ userToken, todoId, taskId }) => {
        return fetch(`${this.apiURL}/task`, this.getOptions({ method: 'DELETE', userToken, body: { todoId, taskId } })).then(
            (res) => res.status === 200
        )
    }
}

export default new TodoProvider()
