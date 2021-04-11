using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoListExample.Models;
using Dapper;
using System.Linq;

namespace TodoListExample.Services
{
    public class Todo : ITodo
    {
        private readonly ILogger<Todo> _logger;
        private readonly IConfiguration _configuration;
        private readonly string TodoDBConnectionString;

        public Todo(ILogger<Todo> logger, IConfiguration _configuration)
        {
            this._logger = logger;
            this._configuration = _configuration;
            TodoDBConnectionString = _configuration.GetConnectionString("TodoDBString");
        }

        public List<TodoModel> GetTodoList()
        {
            List<TodoModel> todoList = new List<TodoModel>();

            try
            {
                using (var conn = new SqlConnection(TodoDBConnectionString))
                {
                    string sql = @" SELECT TodoID, TodoContent, TodoStatus
                                    FROM Todos";

                    todoList = conn.Query<TodoModel>(sql).ToList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return todoList;
        }

        public string AddTodo(TodoModel model)
        {
            try
            {
                using (var conn = new SqlConnection(TodoDBConnectionString))
                {
                    string sql = @" INSERT INTO Todos(TodoID, TodoContent, TodoStatus)
	                                VALUES (@todoid, @todocontent, @todostatus);";

                    conn.Execute(sql, model);
                }
                return model.TodoID;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return string.Empty;
        }
    }
}