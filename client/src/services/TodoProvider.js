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

    getTodos = async ({ userToken, userLogin }) => {
        return await fetch(`${this.apiURL}/userLogin=${userLogin}`, this.getOptions({ method: 'GET', userToken })).then((res) =>
            res.json()
        )
    }

    getTasks = async ({ todoId, userToken }) => {
        return await fetch(`${this.apiURL}/task=${todoId}`, this.getOptions({ method: 'GET', userToken })).then((res) =>
            res.json()
        )
    }

    createTodo = async ({ userToken, userLogin, todoTitle }) => {
        return await fetch(
            this.apiURL,
            this.getOptions({ method: 'POST', userToken, body: { userLogin, title: todoTitle } })
        ).then((res) => res.json())
    }

    createTask = async ({ userToken, todoId, task }) => {
        return await fetch(
            `${this.apiURL}/task`,
            this.getOptions({ method: 'POST', userToken, body: { task, todoId } })
        ).then((res) => res.json())
    }

    deleteTodo = async ({ userToken, todoId }) => {
        return await fetch(this.apiURL, this.getOptions({ method: 'DELETE', userToken, body: { todoId } })).then(
            (res) => res.status === 200
        )
    }

    deleteTask = async ({ userToken, todoId, taskId }) => {
        return await fetch(
            `${this.apiURL}/task`,
            this.getOptions({ method: 'DELETE', userToken, body: { todoId, taskId } })
        ).then((res) => res.status === 200)
    }
}

export default new TodoProvider()
