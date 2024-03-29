import logoImage from '../images/logoimage.jpg';

export default function generateTemplate() {
    generateHeader();
    generateSidebar();
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
    // Add the task list icon
    const taskIcon = document.createElement("img");
    taskIcon.src = logoImage;
    // Add task list item
    const tasksText = document.createElement("p");
    tasksText.textContent = "Tasks";
    // Append items to the sidebar
    sidebar.appendChild(taskIcon);
    sidebar.appendChild(tasksText);
}