namespace TodoListExample.Models
{
    public class TodoModel
    {
        /// <summary>
        /// 待辦事項項目ID
        /// </summary>
        public string TodoID { get; set; }

        /// <summary>
        /// 待辦事項項目內容
        /// </summary>
        public string TodoContent { get; set; }

        /// <summary>
        /// 待辦事項項目狀態
        /// </summary>
        /// <remarks>0: 未完成的項目, 1: 已完成的項目</remarks>
        public int TodoStatus { get; set; }
    }
}