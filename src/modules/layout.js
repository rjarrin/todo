import logoImage from "../images/logoimage.jpg";
import taskImage from "../images/list-box-outline.svg";
import addTaskImage from "../images/plus.svg";
import ProjectManager from "../modules/projectmanager.js";
import { saveProjects, loadProjects } from "../modules/persistence.js"
import Project from "./project.js";
import { createModal, showModal } from "./todomodal.js";
import { format } from "date-fns";

export const projectManager = new ProjectManager();

export default function generateTemplate() {
    loadProjects();
    createModal();
    // Select the first project by default
    const projects = projectManager.getAllProjects();
    if (projects.length === 0) {
        projectManager.addProject("Default Project");
    }
    generateHeader();
    generateSidebar();
    generateTaskContainer();
    //generateButtonContainer();
    if (projects.length > 0) {
        const firstProject = projects[0].name;
        projectManager.setSelectedProject(firstProject);
        highlightProject(firstProject);
        displayTodos();
    }
    
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

    // Create a container for the project list
    const projectListContainer = document.createElement("div");
    projectListContainer.id = "projectListContainer";
    sidebar.appendChild(projectListContainer);

    // Create the project list
    const projectList = document.createElement("ul");
    projectList.id = "projectList";
    projectListContainer.append(projectList);

    // Add event listener to the create project button
    createProjectButton.addEventListener("click", () => {
        const projectName = prompt("Enter a name for a new project:");
        console.log("Project name entered:", projectName);
        if(projectName) {
            console.log("Creating new project with name:", projectName);
            const newProject = new Project(projectName);
            console.log("CALLED ADDPROJECT FROM BUTTON LISTENER");
            projectManager.addProject(newProject);
            updateProjectList();
            saveProjects();

            // Update the currently selected project highlight to the newly added project
            projectManager.setSelectedProject(projectName);
            // Highlight the project
            highlightProject(projectName);
            displayTodos();
        }
    });
    // Update the project list
    updateProjectList();
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

function updateProjectList() {
    const projectList = document.getElementById("projectList");
    // Clear the list
    projectList.innerHTML = "";
    // Iterate over the current projects and repopulate the list
    projectManager.getAllProjects().forEach(project => {
        // Create the project name in the list
        const listItem = document.createElement("li");
        const itemName = document.createElement("span");
        itemName.textContent = project.name;
        listItem.appendChild(itemName);
        // Listener to user's currently selected project
        listItem.addEventListener("click", () => {
            // Update the currently selected project
            updateSelectedProject(project.name);
            console.log("CLICKED THE ITEM");
        });
        // Create and append the edit button
        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const newName = prompt("Enter a new name for the project:");
            if(newName) {
                projectManager.updateProjectName(project.name, newName);
                updateProjectList();
                saveProjects();
            }
        });
        listItem.appendChild(editButton);
        // Create and append the delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            projectManager.removeProject(project.name);
            updateProjectList();
            saveProjects();
        });
        listItem.appendChild(deleteButton);
        projectList.appendChild(listItem);
    });
}

function updateSelectedProject(projectName) {
    // Update the currently selected project
    projectManager.setSelectedProject(projectName);
    // Highlight the selected project
    highlightProject(projectName);
    // Display the todos of the selected project
    displayTodos();
}

function highlightProject(projectName) {
    const projectListItems = document.querySelectorAll("#projectList li");
    console.log("WITHIN HIHGLIGHT:", projectName);

    projectListItems.forEach(item => {
        const itemName = item.querySelector("span");
        console.log("CURRENT ITEM:", item.textContent);
        if (itemName && itemName.textContent === projectName) {
            item.style.cssText = "font-weight: bolder; color: purple;";
            console.log("FOUND A MATCH");
        } else {
            item.style.color = "white";
            item.style.cssText = "font-weight: normal; color: white;";
        }
    });
}

function generateTaskContainer() {
    // Identify the task container
    const taskContainer = document.querySelector("#task-container");
    // Clear the task container
    taskContainer.innerHTML = "";

    // Create a container for just the tasks
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    // Create a container for the footer of the tasks (add-button)
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Add add button to the container
    const addButton = document.createElement("img");
    addButton.id = "add-task";
    addButton.src = addTaskImage;
    addButton.addEventListener("click", () => {
        console.log("Add button pushed");
        showModal();
    });
    buttonContainer.appendChild(addButton);

    // Append tasksContainer and buttonContainer to the taskContainer
    taskContainer.appendChild(tasksContainer);
    taskContainer.appendChild(buttonContainer);
}

export function displayTodos() {
    const taskContainer = document.querySelector(".tasks-container");
    // Clear the task container
    taskContainer.innerHTML = "";

    const selectedProjectName = projectManager.getSelectedProject();
    const selectedProject = projectManager.getProjectByName(selectedProjectName);

    if (!selectedProject) {
        console.log("No project is currently selected");
        return;
    }

    selectedProject.todos.forEach(todo => {
        const todoCard = createTodoCard(todo);
        taskContainer.appendChild(todoCard);
    });
}

function createTodoCard(todo) {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    // Priority line
    card.style.borderLeftColor = getPriorityColor(todo.priority);
    card.style.borderLeftWidth = "8px";

    // Title and description container
    const titleDescriptionContainer = document.createElement("div");
    titleDescriptionContainer.classList.add("title-description-container");

    const title = document.createElement("h3");
    title.textContent = todo.title;
    titleDescriptionContainer.appendChild(title);

    const description = document.createElement("p");
    description.textContent = todo.description;
    titleDescriptionContainer.appendChild(description);
    card.appendChild(titleDescriptionContainer);

    // Due date and creation date container
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");

    const creationDate = document.createElement("p");
    creationDate.textContent = "Created on: "+ format(todo.creationDate, "yyyy-MM-dd");
    dateContainer.appendChild(creationDate);

    if (todo.dueDate) {
        const dueDate = document.createElement("p");
        dueDate.textContent = "Due on: " + format(todo.dueDate, "yyyy-MM-dd");
        dateContainer.appendChild(dueDate);
    } else {
        const dueDate = document.createElement("p");
        dueDate.textContent = "No due date";
        dateContainer.appendChild(dueDate);
    }
    card.appendChild(dateContainer);

    // Edit and Delete buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => console.log("Edit button pressed"));
    buttonsContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        
    });
    buttonsContainer.appendChild(deleteButton);
    card.appendChild(buttonsContainer);

    return card;
}

function getPriorityColor(priority) {
    switch (priority) {
        case "Low":
            return "green";
        case "Medium":
            return "orange";
        case "High":
            return "red";
        default:
            return "grey";
    }
}

