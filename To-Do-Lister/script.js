let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const name = document.getElementById('task-name').value;
    const desc = document.getElementById('task-desc').value;
    const deadline = document.getElementById('task-deadline').value;

    if (!name || !desc || !deadline){
        showNotification('Enter a description of the task and its name or set a deadline!');
        return;
    }

    if (name && desc && deadline) {
        const task = { name, desc, deadline };
        tasks.push(task);
        saveTasks();
        displayTasks();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("task-deadline");
    if (dateInput) {
        if (!dateInput.value) {
            const today = new Date().toISOString().split("T")[0];
            dateInput.value = today;
        }
    }
    displayTasks();
});

function showNotification(title, message) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = 1000;
    document.body.appendChild(overlay);

    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.backgroundColor = 'white';
    notification.style.color = 'black';
    notification.style.padding = '30px';
    notification.style.borderRadius = '8px';
    notification.style.textAlign = 'center';
    notification.style.width = '300px';
    notification.style.zIndex = 1001;

    const icon = document.createElement('div');
    icon.innerHTML = '❌';
    icon.style.fontSize = '40px';
    notification.appendChild(icon);

    const titleElement = document.createElement('h3');
    titleElement.innerText = title;
    titleElement.style.marginTop = '10px';
    notification.appendChild(titleElement);

    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.style.padding = '10px 20px';
    okButton.style.backgroundColor = '#ECF2F6';
    okButton.style.color = '#000';
    okButton.style.border = 'none';
    okButton.style.borderRadius = '5px';
    okButton.style.cursor = 'pointer';
    okButton.onclick = function() {
        notification.remove();
        overlay.remove();
    };
    notification.appendChild(okButton);

    document.body.appendChild(notification);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <div class="details">
                <h3>${task.name}</h3>
                <p>${task.desc}</p>
                <p>Deadline: ${task.deadline}</p>
            </div>
            <button onclick="removeTask(${index})">Delete the task</button>
        `;

        tasksDiv.appendChild(taskElement);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

window.onload = function() {
    displayTasks();
};
