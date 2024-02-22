//Selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const toDoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');
//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addToDo);
toDoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterTodo);
//Functions
function addToDo(event){
    //prevent form from submitting
    event.preventDefault();

    //Todo div
    const tododiv=document.createElement('div');
    tododiv.classList.add('todo');

    //Create List
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    tododiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Check mark button 
    const completeButton=document.createElement('button');
    completeButton.innerHTML='<i class="fa-solid fa-check"></i>';
    completeButton.classList.add('complete-btn');
    tododiv.appendChild(completeButton);


    //Check trash button 
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    tododiv.appendChild(deleteButton);

    //Append new list
    toDoList.appendChild(tododiv);

    todoInput.value='';
}

function deletecheck(event){
    const item=event.target;

    //delete button
    if(item.classList[0]==="delete-btn"){
        const todo=item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    //check button
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(event){
    const todos = Array.from(toDoList.children);
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    //check Doi already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
         //Todo div
    const tododiv=document.createElement('div');
    tododiv.classList.add('todo');

    //Create List
    const newTodo=document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    tododiv.appendChild(newTodo);
    
    //Check mark button 
    const completeButton=document.createElement('button');
    completeButton.innerHTML='<i class="fa-solid fa-check"></i>';
    completeButton.classList.add('complete-btn');
    tododiv.appendChild(completeButton);


    //Check trash button 
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    tododiv.appendChild(deleteButton);

    //Append new list
    toDoList.appendChild(tododiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos))
}