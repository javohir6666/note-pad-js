var todoForm = document.querySelector("#todo-form");
var todoInput = document.querySelector("#todo-input");
var todoListGroup = document.querySelector("#todo-listGroup");
var todoCount = document.querySelector("#todo-count-id");
var todos = [];
var todoInitialID = 0;
function TodoPrototype(text, id) {
    this.id = id;
    this.text = text;
};
/* <li class="list-group-item d-flex align-items-center justify-content-between">
<span>An item</span>
<button class="btn btn-outline-danger">O'chirish</button>
</li> */

function editTodo(todoText, todoId){
    for (i = 0; i < todos.length; i++) {
        if (todos[i].id == todoId) {
            todos[i].text = todoText;
        }
    }
    console.log(todos)
}

function removeTodo(todoId) {
    document.querySelector(`#todo-number-${todoId}`).remove();
    for (i = 0; i < todos.length; i++) {
        if (todos[i].id == todoId) {
            todos.splice(i, 1);
        }
    }
    todoCount.textContent = todos.length;
}
function todoCreateDOM(todoText, todoId) {
    var listItem = document.createElement('li');
    var deleteBtn = document.createElement('button');
    var todoEditInput = document.createElement('input');

    listItem.setAttribute('class', 'list-group-item d-flex align-items-center justify-content-between');
    
    todoEditInput.value = todoText;
    todoEditInput.disabled= true;
    todoEditInput.addEventListener("blur", function(){
        if(todoEditInput.value.length > 0){
            editTodo(todoEditInput.value, todoId);
            todoEditInput.disabled= true;
            todoEditInput.style.borderBottom = "1px solid blue";
        }
        else{
            todoEditInput.style.borderBottom = "1px solid red";
        }
    })
    todoEditInput.addEventListener("keypress", function(e){
        if(e.key === "Enter" && todoEditInput.value.length > 0){
            editTodo(todoEditInput.value, todoId);
            todoEditInput.disabled= true;
            todoEditInput.style.borderBottom = "transparent";
            todoEditInput.blur();
        }
        else{
            todoEditInput.style.borderBottom = "1px solid red";
        };
    })

    todoEditInput.setAttribute('class','todo-edit-input');
    deleteBtn.textContent = 'O\'chirish';
    deleteBtn.setAttribute('class', 'btn btn-outline-danger');
    deleteBtn.addEventListener(`click`, function () {
        removeTodo(todoId);
    });

    listItem.addEventListener('dblclick', function(){
        todoEditInput.disabled= false;
        todoEditInput.focus();
    });

    listItem.appendChild(todoEditInput);
    listItem.appendChild(deleteBtn);
    todoListGroup.appendChild(listItem);

    listItem.setAttribute('id', `todo-number-${todoId}`);
};

function todoCreate(todoText, todoId) {
    todoCreateDOM(todoText, todoId);
    todos.push(new TodoPrototype(todoText, todoId));
    todoCount.textContent = todos.length;
};


todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    todoCreate(todoInput.value, todoInitialID);
    todoForm.reset();

    todoInitialID++;
    console.log(todos)
});