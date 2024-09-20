document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div class="task-actions">
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="complete" onclick="completeTask(this)">Complete</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskText = taskItem.querySelector('span').innerText;
    const newTaskText = prompt('Edit Task:', taskText);
    if (newTaskText !== null) {
        taskItem.querySelector('span').innerText = newTaskText;
    }
}

function completeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
    if (taskItem.classList.contains('completed')) {
        const img = document.createElement('img');
        img.src = 'images/complete.png';
        img.alt = 'Completed';
        img.style.width = '20px';
        img.style.height = '20px';
        taskItem.appendChild(img);
        
        // Remove the edit button
        const editButton = taskItem.querySelector('.edit');
        if (editButton) editButton.remove();
    } else {
        const img = taskItem.querySelector('img[alt="Completed"]');
        if (img) img.remove();
        
        // Re-add the edit button
        const taskActions = taskItem.querySelector('.task-actions');
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.innerText = 'Edit';
        editButton.onclick = function() { editTask(editButton); };
        taskActions.insertBefore(editButton, taskActions.firstChild);
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}
