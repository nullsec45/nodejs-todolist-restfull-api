import http from "http";
import { TodoListService } from "./todolist-service.mjs";

const todoListService = new TodoListService();
const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        todoListService.getTodoList(req, res);
    }
});

server.listen(3000);