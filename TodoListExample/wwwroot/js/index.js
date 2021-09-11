(function () {
    initGet();
})();

function initGet() {
    $.ajax({
        method: 'GET',
        url: '/api/Todo'
    }).done(function (data) {
        if (data.length > 0) {
            for (i = 0; i < data.length; i++) {
                addTodoItem(data[i].todoID, data[i].todoContent, data[i].todoStatus);
            }
        }
    });
}

function add() {
    var todoContent = $('#todoText').val();
    $.ajax({
        method: 'POST',
        url: '/api/Todo',
        data: JSON.stringify(todoContent),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (data) {
        addTodoItem(data, todoContent, 0);
        $('#todoText').val('');
    });
}

function remove(e) {
    var todoRow = $(e).closest('.row');
    $.ajax({
        method: 'DELETE',
        url: '/api/Todo' + '/' + todoRow.attr('id')
    }).done(function (data) {
        var itemContent = $('#' + data).find("label#ItemContent").text();
        alert(itemContent + ' 刪除成功!');
        deleteTodoItem(todoRow);
    });
}

function update(e) {
    var todoRow = $(e).closest('.row');
    var todoId = todoRow.attr('id');
    var todoContent = $('#' + todoId).find("label#ItemContent").text();
    var todoStatus = e.checked ? 1 : 0;
    var params = {
        "TodoID": todoId,
        "TodoContent": todoContent,
        "TodoStatus": todoStatus
    };
    $.ajax({
        method: 'PUT',
        url: '/api/Todo',
        data: JSON.stringify(params),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (data) {
        deleteTodoItem(todoRow);
        addTodoItem(todoId, todoContent, todoStatus);
    });
}

function addTodoItem(todoID, todoContent, todoStatus) {
    var cloneItem = $('#ItemTemplate').clone();
    var addLocation = $('#ItemList');
    cloneItem.attr("id", todoID);
    if (todoStatus == 1) {
        cloneItem.find("input#todoStatus").prop('checked', true);
        cloneItem.find("label#ItemContent").css('text-decoration', 'line-through');
        addLocation = $('#DoneItemList');
    }
    cloneItem.removeAttr('hidden');
    cloneItem.find("label#ItemContent").text(todoContent);
    addLocation.append(cloneItem);
}

function deleteTodoItem(e) {
    $(e).remove();
}
