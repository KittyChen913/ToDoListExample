(function () {
  $.ajax({
    method: 'GET',
    url: '/api/Todo'
  }).done(function (data) {
    if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        var cloneItem = $('#ItemTemplate').clone();
        cloneItem.attr("id", data[i].todoID);
        cloneItem.removeAttr('hidden');
        cloneItem.find("label#ItemContent").text(data[i].todoContent);
        $('#ItemList').append(cloneItem);
      }
    }
  });
})();