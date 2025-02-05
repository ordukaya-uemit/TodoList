document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('newTodo');
    const addTodoButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');
    const deleteSelectedButton = document.getElementById('deleteSelected');

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('input').checked
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.className = 'mr-2';
            const span = document.createElement('span');
            span.textContent = todo.text;
            li.appendChild(checkbox);
            li.appendChild(span);
            todoList.appendChild(li);

            checkbox.addEventListener('change', saveTodos);
        });
    }

    addTodoButton.addEventListener('click', () => {
        if (newTodoInput.value.trim() === '') return;

        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mr-2';
        const span = document.createElement('span');
        span.textContent = newTodoInput.value;
        li.appendChild(checkbox);
        li.appendChild(span);
        todoList.appendChild(li);

        checkbox.addEventListener('change', saveTodos);

        newTodoInput.value = '';
        saveTodos();
    });

    deleteSelectedButton.addEventListener('click', () => {
        todoList.querySelectorAll('li').forEach(li => {
            if (li.querySelector('input').checked) {
                li.remove();
            }
        });
        saveTodos();
    });

    loadTodos();
});

