import { projectManager } from "./layout.js";
import { saveProjects } from "./persistence.js";
import Todo from "./todo.js";


function createModal() {
    // Define modal div
    const modal = document.createElement("div");
    modal.id = "todo-modal";
    // Modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    // Title
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Add Todo";

    // Create the form
    const form = document.createElement("form");
    form.id = "todo-form";

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("todo-title-input").value;
        const description = document.getElementById("todo-description-input").value;
        const dueDate = document.getElementById("todo-date-input").value;
        const priority = document.getElementById("todo-priority-input").value;
        if (title) {
            addTodoToProject(title, description, dueDate, priority);
            modal.style.display = "none";
            form.reset();
        }
    });

    // Title input
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("modal-form-container");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = "todo-title-input";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.required = true;
    titleInput.id = "todo-title-input";
    titleInput.name = "todo-title";
    titleInput.placeholder = "Enter title";

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);
    form.appendChild(titleContainer);

    // Description
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("modal-form-container");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    descriptionLabel.htmlFor = "todo-description-input";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "todo-description-input";
    descriptionInput.name = "todo-description";
    descriptionInput.placeholder = "Enter the todo description";

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);
    form.appendChild(descriptionContainer);

    // Due Date
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("modal-form-container");

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Due Date:";
    dateLabel.htmlFor = "todo-date-input";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "todo-date-input";
    dateInput.name = "todo-date";

    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dateInput);
    form.appendChild(dateContainer);

    // Priority
    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add("modal-form-container");

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority:";
    priorityLabel.htmlFor = "todo-priority-input";

    const priorityInput = document.createElement("select");
    priorityInput.id = "todo-priority-input";
    priorityInput.name = "todo-priority";
    const priorities = ["", "Low", "Medium", "High"];
    priorities.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        priorityInput.appendChild(option);
    });

    priorityContainer.appendChild(priorityLabel);
    priorityContainer.appendChild(priorityInput);
    form.appendChild(priorityContainer);

    // Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        form.reset();
    });
    // Add Button
    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.type = "submit";

    // Append elements
    modalContent.appendChild(modalTitle);

    form.appendChild(closeButton);
    form.appendChild(addButton);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function showModal() {
    const modal = document.getElementById("todo-modal");
    modal.style.display = "block";
}

function addTodoToProject(title, description, dueDate, priority) {
    const selectedProjectName = projectManager.getSelectedProject();
    const selectedProject = projectManager.getProjectByName(selectedProjectName);

    if(!selectedProject) {
        console.error("No project is currently selected.");
        return;
    }
    const newTodo = new Todo(title, description, dueDate, new Date(), priority, "", []);

    selectedProject.addTodo(newTodo);
    saveProjects();
}

export {createModal, showModal};