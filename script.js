const TODOContainer = document.getElementById('todo_container');
const API_URL = 'https://dummyjson.com/todos';


async function fetchTodos() {
    try {
        TODOContainer.innerHTML = '<div class="loading">Loading TODOs...</div>';

        const response = await fetch(API_URL);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayTodos(data.todos);
    } catch(error) {
        console.error('Error fetching TODOs: ', error);
        TODOContainer.innerHTML = `
            <div class="error">
                Error loading TODOs: ${error.message}
            </div>
        `;
    }
}

function displayTodos(todos) {
    TODOContainer.innerHTML = '';

    if(!todos || todos.length === 0) {
        TODOContainer.innerHTML = '<div class="loading">No TODOs found.</div>';
        return;
    }

    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        TODOContainer.appendChild(todoElement);
    });
}

function createTodoElement(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';

    todoDiv.innerHTML = `
        <div class="todo-content">${todo.todo}</div>
        <div class="todo-meta">
            <div class="todo-id">ID: ${todo.id}</div>
            <div class="todo-status ${todo.completed ? 'status-completed' : 'status-pending'}">
                ${todo.completed ? 'Completed' : 'Pending'}
            </div>
            <div class="todo-user">User: ${todo.userId}</div>
        </div>
    `;
    return todoDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
});