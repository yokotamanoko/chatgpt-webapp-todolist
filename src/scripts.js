$(document).ready(function() {
    // フォームが送信されたときの処理
    $('#todo-form').submit(function(event) {
        event.preventDefault();
        var todoText = $('#todo-input').val();
        if (todoText !== '') {
            todoText = convertToFullWidth(todoText);
            addTodoItem(todoText);
            $('#todo-input').val('');
        }
    });

    // 削除ボタンがクリックされたときの処理
    $(document).on('click', '.delete-btn', function() {
        $(this).closest('li').remove();
    });

    // チェックボックスが変更されたときの処理
    $(document).on('change', '.todo-item input[type="checkbox"]', function() {
        var todoItem = $(this).closest('li');
        if (this.checked) {
            todoItem.addClass('completed');
        } else {
            todoItem.removeClass('completed');
        }
    });

    // ドラッグで並び替え可能にする
    $('#todo-list').sortable();
});

function addTodoItem(todoText) {
    var listItem = $('<li class="list-group-item todo-item"></li>');
    var checkbox = $('<input type="checkbox" class="me-1">');
    var deleteBtn = $('<span class="delete-btn"><u>削除</u></span>');
    listItem.append(checkbox);
    listItem.append(todoText);
    listItem.append(deleteBtn);
    $('#todo-list').append(listItem);
}

function convertToFullWidth(text) {
    var fullWidthText = text.replace(/[!-~]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
    return fullWidthText;
}
