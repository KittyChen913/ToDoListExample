using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoListExample.Models;
using TodoListExample.Services;

namespace TodoListExample.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private ITodo _todo;

        public TodoController(ITodo todo)
        {
            this._todo = todo;
        }

        [HttpGet]
        public List<TodoModel> Get()
        {
            List<TodoModel> todoModel = _todo.GetTodoList();
            return todoModel;
        }

        [HttpPost]
        public string Post([FromBody] string todoContent)
        {
            TodoModel model = new TodoModel()
            {
                TodoID = Guid.NewGuid().ToString(),
                TodoContent = todoContent,
                TodoStatus = 0
            };
            string todoID = _todo.AddTodo(model);
            return todoID;
        }
        [HttpDelete("{todoId}")]
        public string Delete(string todoId)
        {
            TodoModel model = new TodoModel()
            {
                TodoID = todoId
            };
            string todoID = _todo.DeleteTodo(model);
            return todoID;
        }
    }
}
