
// Creating the template for new todo items
let todoTemplate = document.querySelector('.template');


//Getting saved todos from previous sessions
let savedTodos = JSON.parse(localStorage.getItem('todolist'));

let newInput = document.querySelector('input');
let clearBox = document.querySelector('.clear-box');
let todoList = document.querySelector('.todos');
let controls = document.querySelector('.controls');

//Filter Buttons
let filter = document.querySelector('.filter');
let filterAll = document.querySelector('.f-all');
let filterActive = document.querySelector('.f-active');
let filterCompleted = document.querySelector('.f-completed');

//Loading saved todos
if(savedTodos) {
    savedTodos.reverse().forEach(todo=>{
        let newTodo = todoTemplate.cloneNode(true);
        newTodo.classList.remove('template');
        newTodo.querySelector('p').innerText = todo.text;
        if(todo.isDone){
            newTodo.classList.add('done');
        }
        doneBtn(newTodo.querySelector('.check-box'));
        deleteAppear(newTodo);
        deleteFunction(newTodo.querySelector('.delete'));
        todoList.prepend(newTodo);
        controls.classList.remove('none');
    });
    activeTodos();
}

//Adding new todos

window.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        if (newInput.value!=="") {
            let newTodo = todoTemplate.cloneNode(true);
            newTodo.classList.remove('template');
            newTodo.querySelector('p').innerText = newInput.value;
            doneBtn(newTodo.querySelector('.check-box'));
            deleteAppear(newTodo);
            deleteFunction(newTodo.querySelector('.delete'));
            todoList.prepend(newTodo);
            clearBox.click();
            controls.classList.remove('none');
            activeTodos();
            storeTodos();
            document.querySelector('.focusout').focus();
        }
    }
});

//Activating/deactivating clear button
newInput.addEventListener('input',(e)=>{
    if(e.target.value!==""){
        clearBox.classList.add('cb-active');
    }
    else{
        clearBox.classList.remove('cb-active');
    }
});

//Clear button function

clearBox.addEventListener('click',()=>{
    clearBox.classList.remove('cb-active');
    newInput.value = "";
});

//Updating active todos number

function activeTodos () {
    let allTodos = document.querySelectorAll('.a-todo');
    let doneTodos = document.querySelectorAll('.done');
    let active =  allTodos.length-doneTodos.length-1;
    controls.querySelector('span').innerText = active;
}

//Checking/uncheking a task

function doneBtn(theBtn) {
    theBtn.addEventListener('click',(e)=>{
        e.target.parentElement.classList.toggle('done');
        activeTodos();
        document.querySelectorAll('.filter-option').forEach(option=> option.classList.contains('active') ? option.click() : false);
        storeTodos();
    })
}

//Filtering

filter.addEventListener('click',(e)=>{

    if(e.target===filterAll){
        document.querySelectorAll('.a-todo').forEach(todo=>{
            todo.classList.remove('hidden');
        });
    }
    else if(e.target===filterActive){
        document.querySelectorAll('.a-todo').forEach(todo=>{
            todo.classList.remove('hidden');
            if(todo.classList.contains('done')){
                todo.classList.add('hidden');
            }
        });
    }
    else {
        document.querySelectorAll('.a-todo').forEach(todo=>{
            todo.classList.remove('hidden');
            if(!todo.classList.contains('done')){
                todo.classList.add('hidden');
            }
        });
    }
    
    document.querySelectorAll('.filter-option').forEach(option=>option.classList.remove('active'));
    e.target.classList.add('active');
});

//Delete icon animation

function deleteAppear (todoBox) {
    todoBox.addEventListener('mouseenter',(e)=>{
        let deleteBtn = e.target.querySelector('.delete');
        deleteBtn.classList.add('active');
        e.target.addEventListener('mouseleave',()=>{
            deleteBtn.classList.remove('active');
        });
        
    });
}

//Deleting a task

function deleteFunction (dBtn) {
    dBtn.addEventListener('click',(e)=>{
        let parent = e.target.parentElement;
        let todoList = parent.parentElement;
        todoList.removeChild(parent);
        activeTodos();
        isTaskLeft();
        storeTodos();
    });
}

//Clear all competed tasks

let clearCompletedBtn = document.querySelector('.clear-done');

clearCompletedBtn.addEventListener('click',(e)=>{
    let allTasks = document.querySelectorAll('.a-todo');
    allTasks.forEach(task=>{
        if(task.classList.contains('done')){
            task.parentElement.removeChild(task);
        }
    });
    isTaskLeft();
    storeTodos();
})

//Store all todos to localstorage

function storeTodos () {
    localStorage.clear();
    let todolistArr = [];
    let allTodosList = document.querySelectorAll('.a-todo');
    allTodosList.forEach(todo=>{
        if(todo.classList.contains('template')){
            return
        }
        let todoArr = {};
        todoArr.text = todo.querySelector('p').innerText;
        todoArr.isDone = todo.classList.contains('done');
        todolistArr.push(todoArr);
    });
    localStorage.setItem('todolist',JSON.stringify(todolistArr));
}

//Chekh if task left

function isTaskLeft () {
    let allTheTasks = document.querySelectorAll('.a-todo');
    if(allTheTasks.length<2){
        console.log('none left');
        controls.classList.add('none');
    }
}

//Dark Mode toggle

let mainCtn = document.querySelector('.main');
let theApp = document.querySelector('.the-app');
let toggleMode = document.querySelector('.mode-change');

toggleMode.addEventListener('click',()=>{
    mainCtn.classList.toggle('main-dark');
    theApp.classList.toggle('the-app-dark');
})