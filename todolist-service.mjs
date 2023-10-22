export class TodoListService {
    todolist = ["Makan", "Ngoding", "Baca Buku"];


    getJSONTodoList() {
        return JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todolist.map((value, index) => {
                return {
                    id: index + 1,
                    todo: value
                }
            })
        })
    }

    getTodoList(req, res) {
        res.write(this.getJSONTodoList());
        res.end();
    }

    createTodoList(req, res) {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.todolist.push(body.todo);

            res.write(this.getJSONTodoList());
            res.end();
        })
    }

    updateTodoList(req, res) {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());

            let todoUpdate = this.todolist.filter((todo) => body.id == todo.id);
            if (todoUpdate == undefined) {
                res.write(JSON.stringify(
                    {
                        code: 404,
                        status: "NOT OK",
                        message: "Todo Not Found"
                    }
                ));
                res.end();
            } else {
                todoUpdate.todo = body.todo;
                res.write(this.getJSONTodoList());
                res.end();
            }
        })
    }

    deleteTodoList(req, res) {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());

            let find = this.todolist.find((todo, index) => index == body.id - 1);
            if (find == undefined) {
                res.write(JSON.stringify(
                    {
                        code: 404,
                        status: "NOT OK",
                        message: "Todo Not Found"
                    }
                ));
                res.end();
            } else {
                // this.todolist.splice(body.id, 1);
                this.todolist = this.todolist.filter((todo, index) => index !== body.id - 1);
                res.write(this.getJSONTodoList());
                res.end();
            }
        })
    }
}