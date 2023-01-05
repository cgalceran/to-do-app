document.getElementById("task-form").addEventListener('submit', createTask);


function createTask(e) {
    let taskDescription = document.getElementById('task-description').value;
    let taskID = Math.floor(Math.random() * 100000);

    let task = {
        id: taskID,
        description: taskDescription,
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

            taskList.innerHTML += `
            <div id="${id}">
            <div class="list">
            <input type="checkbox" onclick="if (this.checked) {toggle(${id + 1})} else {toggleOff(${id + 1})}">
            <p id="${id + 1}">${description}</p>
            <img id="${id + 2}" onclick="deleteTask(${id})" src="delete-button.png" hidden="hidden">
            </div>
            </div>
        
        `;

        }



    }


}


// Cross Task if Done also delete icon should appear (This section I have to refactor)

function toggle(id) {
    let paragraph = document.getElementById(id);
    paragraph.classList.add("strike");
    let image = document.getElementById(id + 1);
    image.removeAttribute("hidden");

}

function toggleOff(id) {
    let paragraph = document.getElementById(id);
    paragraph.classList.remove("strike");
    let image = document.getElementById(id + 1);
    image.setAttribute("hidden", "hidden");


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
