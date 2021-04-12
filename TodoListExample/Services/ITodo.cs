using System.Collections.Generic;
using TodoListExample.Models;

namespace TodoListExample.Services
{
    public interface ITodo
    {
        public List<TodoModel> GetTodoList();
        public string AddTodo(TodoModel model);
        public string DeleteTodo(TodoModel model);
        public string UpdateTodo(TodoModel model);
    }
}