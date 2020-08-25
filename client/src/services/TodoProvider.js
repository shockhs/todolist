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
        try {
            return await fetch(
                `${this.apiURL}/userLogin=${userLogin}`,
                this.getOptions({ method: 'GET', userToken })
            ).then((res) => res.json())
        } catch (e) {
            throw new Error(e)
        }
    }

    getTasks = async ({ todoId, userToken }) => {
        try {
            return await fetch(`${this.apiURL}/task=${todoId}`, this.getOptions({ method: 'GET', userToken })).then((res) =>
                res.json()
            )
        } catch (e) {
            throw new Error(e)
        }
    }

    createTodo = async ({ userToken, userLogin, todoTitle }) => {
        try {
            return await fetch(
                this.apiURL,
                this.getOptions({ method: 'POST', userToken, body: { userLogin, title: todoTitle } })
            ).then((res) => res.json())
        } catch (e) {
            throw new Error(e)
        }
    }

    createTask = async ({ userToken, todoId, task }) => {
        try {
            return await fetch(
                `${this.apiURL}/task`,
                this.getOptions({ method: 'POST', userToken, body: { task, todoId } })
            ).then((res) => res.json())
        } catch (e) {
            throw new Error(e)
        }
    }

    deleteTodo = async ({ userToken, todoId }) => {
        try {
            return await fetch(this.apiURL, this.getOptions({ method: 'DELETE', userToken, body: { todoId } })).then(
                (res) => res.status === 200
            )
        } catch (e) {
            throw new Error(e)
        }
    }

    deleteTask = async ({ userToken, todoId, taskId }) => {
        try {
            return await fetch(
                `${this.apiURL}/task`,
                this.getOptions({ method: 'DELETE', userToken, body: { todoId, taskId } })
            ).then((res) => res.status === 200)
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default new TodoProvider()
