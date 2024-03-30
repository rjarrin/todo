import logoImage from "../images/logoimage.jpg";
import taskImage from "../images/list-box-outline.svg";
import addTaskImage from "../images/plus-circle-outline.svg";

export default function generateTemplate() {
    generateHeader();
    generateSidebar();
    generateTaskContainer();
}

function generateHeader() {
    // Identify the header
    const header = document.getElementById("header");
    // Append the task image to the header
    const headerImage = document.createElement("img");
    headerImage.src = logoImage;
    // Create and append the header title
    const headerTitle = document.createElement("h1");
    headerTitle.textContent = "To-Do List";
    headerTitle.style.float = "left";
    header.appendChild(headerImage);
    header.appendChild(headerTitle);
}

function generateSidebar() {
    // Identify the sidebar div
    const sidebar = document.querySelector("#sidebar");
    // Create a new div to hold the task items
    const taskListItems = document.createElement("div");
    taskListItems.classList.add("task-list-item");
    // Add the task list icon
    const taskIcon = document.createElement("img");
    taskIcon.src = taskImage;
    // Add task list item
    const tasksText = document.createElement("p");
    tasksText.textContent = "Tasks";
    // Append items to the sidebar
    taskListItems.appendChild(taskIcon);
    taskListItems.appendChild(tasksText);
    sidebar.appendChild(taskListItems);

    // Create the button for creating new projects
    const createProjectButton = document.createElement("button");
}

function generateTaskContainer() {
    // Identify the task container
    const taskContainer = document.querySelector("#task-container");
    // Create a container for just the tasks
    // Create a container for the footer of the tasks (add-button)
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    // Add temp text to container
    // const taskText = document.createElement("p");
    // taskText.textContent = "Task here";
    // taskContainer.appendChild(taskText);

    // Add add button to the container
    const addButton = document.createElement("img");
    addButton.id = "add-task";
    addButton.src = addTaskImage;
    addButton.addEventListener("click", () => {
        console.log("Add button pushed");
    });
    // taskContainer.appendChild(addButton);
    buttonContainer.appendChild(addButton);
    taskContainer.appendChild(buttonContainer);
}