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
            console.log(body);

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

    }
}