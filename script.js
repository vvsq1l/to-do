const inputText = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function loadTask() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    } else {
        tasks = [];
    }
}

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = inputText.value.trim();

    if (text === "") {
        alert("Напиши задачу!")
        return;
    }

    const task = {
        id: Date.now(),
        text: text
    }

    tasks.push(task);
    saveTask();
    renderTask();
    inputText.value = "";
}

function renderTask() {
    taskList.innerHTML = "";

    for (let task of tasks) {
        const li = document.createElement("li");
        li.textContent = task.text;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li)
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTask();
    renderTask();
}

loadTask();
renderTask();

addBtn.addEventListener("click", addTask);

inputText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
