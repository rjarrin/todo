import logoImage from "../images/logoimage.jpg";
import taskImage from "../images/list-box-outline.svg";
import addTaskImage from "../images/plus-circle-outline.svg";
import ProjectManager from "../modules/projectmanager.js";
import { saveProjects, loadProjects } from "../modules/persistence.js"
import Project from "./project.js";

export const projectManager = new ProjectManager();

export default function generateTemplate() {
    loadProjects();
    // Checks if the "Default Project" already exists
    const defaultProjectExists = projectManager.getAllProjects().some(project => project.name === "Default Project");
    if(!defaultProjectExists) {
        // Add a default project
        console.log("CALLED ADDPROJECT FROM DEFAULTPROJECTEXISTS");
        projectManager.addProject("Default Project");
    }
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
    createProjectButton.id = "createProjectButton";
    createProjectButton.textContent = "Create New Project";
    sidebar.appendChild(createProjectButton);

    // Create the dropdown for selecting projects
    const projectSelect = document.createElement("select");
    projectSelect.id = "projectSelect";
    sidebar.appendChild(projectSelect);

    // Add event listener to the create project button
    createProjectButton.addEventListener("click", () => {
        const projectName = prompt("Enter a name for a new project:");
        console.log("Project name entered:", projectName);
        if(projectName) {
            console.log("Creating new project with name:", projectName);
            const newProject = new Project(projectName);
            console.log("CALLED ADDPROJECT FROM BUTTON LISTENER");
            projectManager.addProject(newProject);
            updateProjectDropdown();
            saveProjects();
        }
    });
    // Call updateProjectDropdown to populate the dropdown initially
    updateProjectDropdown();
}

function updateProjectDropdown() {
    const select = document.getElementById("projectSelect");
    // Clear the dropdown
    select.innerHTML = "";
    projectManager.getAllProjects().forEach(project => {
        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;
        select.appendChild(option);
    });
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