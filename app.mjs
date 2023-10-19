import http from "http";
import { TodoListService } from "./todolist-service.mjs";

const todoListService = new TodoListService();
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json")

    switch (req.method) {
        case "GET":
            todoListService.getTodoList(req, res);
            break;
        case "POST":
            todoListService.createTodoList(req, res);
            break;
        case "PUT":
            todoListService.updateTodoList(req, res);
            break;
        case "DELETE":
            todoListService.deleteTodoList(req, res);
            break;

    }

});

server.listen(3000);