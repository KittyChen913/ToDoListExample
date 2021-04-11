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
        addTodoItem(data[i].todoID, data[i].todoContent);
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
    addTodoItem(data, todoContent);
  });
}

function addTodoItem(todoID, todoContent) {
  var cloneItem = $('#ItemTemplate').clone();
  cloneItem.attr("id", todoID);
  cloneItem.removeAttr('hidden');
  cloneItem.find("label#ItemContent").text(todoContent);
  $('#ItemList').append(cloneItem);
}