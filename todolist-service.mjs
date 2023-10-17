export class TodoListService {
    todolist = [];

    getTodoList(eeq, res) {
        res.write("Fajar Ganteng");
        res.end();
    }
}