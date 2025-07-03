const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTaskToDOM(taskText, isCompleted = false) {
    const li = document.createElement('li');

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', function () {
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
    });

    const span = document.createElement('span');
    span.textContent = taskText;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(span);
    li.appendChild(taskContent);

    if (isCompleted) {
        li.classList.add('completed');
    }

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.className = 'removeBtn';
    removeBtn.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
}

addBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM(taskText);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Por favor, digite uma tarefa!');
    }
});

taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});

document.addEventListener('DOMContentLoaded', loadTasks);