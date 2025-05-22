const TODOContainer = document.getElementById('todo_container');

const API_URL = 'https://dummyjson.com/todos';


async function fetchTodos() {
    try{
        const reponse = await fetch(API_URL);
        const data = await reponse.json();
        displayTodos(data.todos);
    } catch(error) {
        console.error('Error fetching TODOs: ', error);
    }
}

function displayTodos(todos) {
    TODOContainer.innerHTML = '';
    todos.forEach(todo => {
        TODOContainer.appendChild(todo);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
});