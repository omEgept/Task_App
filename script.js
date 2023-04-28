const taskList = document.getElementById("task-list");
const completedCount = document.getElementById("completed");
const incompleteCount = document.getElementById("incomplete");
const taskInput = document.getElementById("task");
const timeInput = document.getElementById("time");
const addBtn = document.getElementById("add-btn");

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.task}</span>
            <span>${task.time}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        if (task.completed) {
            li.classList.add("completed");
            taskList.appendChild(li);
        } else {
            taskList.prepend(li);
        }
        li.addEventListener("click", () => {
            if (!task.completed) {
                task.completed = true;
                renderTasks();
            }
        });
    });
    completedCount.textContent = tasks.filter(task => task.completed).length;
    incompleteCount.textContent = tasks.filter(task => !task.completed).length;

    if (tasks.length > 0 && tasks.every(task => task.completed)) {
        Swal.fire({
            title: "Congratulations!",
            text: "You have completed all tasks!",
            icon: "success",
            confirmButtonText: "Great!"
        });
       
    }
}

function addTask() {
    const task = taskInput.value.trim();
    const time = timeInput.value.trim();
    if (task && time) {
        tasks.push({ task, time, completed: false });
        taskInput.value = "";
        timeInput.value = "";
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addBtn.addEventListener("click", addTask);

renderTasks();