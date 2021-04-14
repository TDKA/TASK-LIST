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
  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear all task event
  clearBtn.addEventListener("click", clearTasks);

  //Search for tasks event
  searchTasks.addEventListener("keyup", searchTask);
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

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement("a");

    // Add class to 'i'
    link.className = "delete-item secondary-content";

    // Add icon html
    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
  }
  e.preventDefault();
}

// Remove the task FUNCTION

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Sure about this ?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear all FUNCTION

function clearTasks() {
  taskList.innerHTML = "";
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
