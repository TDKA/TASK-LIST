"use strict";

// define variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection-tasks");
const clearBtn = document.querySelector(".clear-tasks");
const searchTasks = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Function Load all event listeners
function loadEventListeners() {
  // LOADING EVENT
  document.addEventListener("DOMContentLoaded", takeTasks);

  //ADD TASK EVENT
  form.addEventListener("submit", addTask);

  // REMOVE TASK EVENT
  taskList.addEventListener("click", removeTask);

  // CLEAR ALL TASKS EVENT
  clearBtn.addEventListener("click", clearTasks);

  // SEARCH FOR TAKS EVENT
  searchTasks.addEventListener("keyup", searchTask);
}

// Take tasks from local storage
function takeTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    // Add class
    li.className = "items";

    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("First you have to add a task !");
  } else {
    // Create li element
    const li = document.createElement("li");

    // Add class
    li.className = "items";

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    //Local storage
    keepTask(taskInput.value);

    // Clear input
    taskInput.value = "";
  }
  e.preventDefault();
}

// Local storage tasks

function keepTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove the task FUNCTION

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Sure about this ?")) {
      e.target.parentElement.parentElement.remove();

      //Remove from From local storage
      removeTaskFromStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from local storage FUNCTION
function removeTaskFromStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("task") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all FUNCTION

function clearTasks() {
  taskList.innerHTML = "";

  //clear tasks from local storage
  clearTaskStorage();
}

//clear tasks from local storage
function clearTaskStorage() {
  localStorage.clear();
}

// Search for task FUNCTION

function searchTask(e) {
  let typeText = e.target.value.toLowerCase();

  let tasks = document.querySelectorAll(".items");

  tasks.forEach(function (task) {
    // take the first child of "tasks"
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(typeText) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
