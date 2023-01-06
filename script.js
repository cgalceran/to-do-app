document.getElementById("task-form").addEventListener('submit', createTask);


function createTask(e) {
    let taskDescription = document.getElementById('task-description').value;
    let taskID = Math.floor(Math.random() * 100000);

    let task = {
        id: taskID,
        description: taskDescription,
        completed: false
    }

    if (typeof (Storage) !== "undefined") { // Check if the browser accepts localStorage
        if (localStorage.getItem('tasks') === null) {
            let tasks = [];
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks))
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    } else {
        console.log("This browser does not support Local Storage, try a different browser!");
    }


};




// Display Task on Page and also when loading page if there are any tasks 
// I found a workaround adding to the id when setting ids for different elements... (might need to check this again)

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
    let taskList = document.getElementById('tasks-list');

    if (tasks !== null) {
        for (let index = tasks.length - 1; index >= 0; index--) {
            let id = tasks[index].id;
            let description = tasks[index].description;
            let completed = tasks[index].completed;

            if (completed == false) {

                taskList.innerHTML += `
                <div id="${id}">
                <div class="list">
                <input type="checkbox" onclick="if (this.checked) {toggleOn(${id + 1})} else {toggleOff(${id + 1})}">
                <p id="${id + 1}">${description}</p>
                <img id="${id + 2}" onclick="deleteTask(${id})" src="delete-button.png" hidden="hidden">
                </div>
                </div>
            
                `;
            } else {
                taskList.innerHTML += `
                <div id="${id}">
                <div class="list">
                <input type="checkbox" checked onclick="if (this.checked) {toggleOn(${id + 1})} else {toggleOff(${id + 1})}">
                <p class="strike" id="${id + 1}">${description}</p>
                <img id="${id + 2}" onclick="deleteTask(${id})" src="delete-button.png">
                </div>
                </div>
            
                `;
            }
        }
    }
}


// Strikethrough Tasks if Done also delete icon should appear and boolean completed to true 
//(This section I have to refactor, there has to be a better way than two toggle functions)

function toggleOn(id) {
    let task = [];
    let paragraph = document.getElementById(id);
    paragraph.classList.add("strike");
    let image = document.getElementById(id + 1);
    image.removeAttribute("hidden");
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id - 1) {
            console.log(tasks[i].completed = true);
        }
        task.push(tasks);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleOff(id) {
    let task = [];
    let paragraph = document.getElementById(id);
    paragraph.classList.remove("strike");
    let image = document.getElementById(id + 1);
    image.setAttribute("hidden", "hidden");
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id - 1) {
            console.log(tasks[i].completed = false);
        }
        task.push(tasks);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));


}

// Delete each Task

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].id == id) {
            document.getElementById(tasks[index].id).remove();
            tasks.splice(index, 1);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));


}
