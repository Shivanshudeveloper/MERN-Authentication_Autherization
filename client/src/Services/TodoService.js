export default {
    getTodos: () => {
        return fetch('/user/todos')
                .then(response => {
                    if (response.status !== 401) {
                        return response.json().then(data => data)
                    } else {
                        return {message: {msgBody: "Unauthorized"}, msgError: true}
                    }
                })
    },
    postTodo: todo => {
        return fetch('/user/todo', {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data)
            } else {
                return {message: {msgBody: "Unauthorized"}, msgError: true}
            }
        });
    }
}