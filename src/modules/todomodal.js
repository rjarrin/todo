import Todo from "./todo.js";

function createModal() {
    // Define modal div
    const modal = document.createElement("div");
    modal.id = "todo-modal";
    // Modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    // Close button
    const closeModal = document.createElement("span");
    closeModal.classList.add("modal-close");
    closeModal.innerHTML = '&times;';
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
    // Title
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Add Task";
    // Form
    const form = document.createElement("form");
    form.onsubmit = function(e) {
        e.preventDefault();
        // NEED TO ADD LOGIC FOR HANDLING FORM SUBMISSION LATER
        modal.style.display = "none";
    }

    generateElements(form);

    const addTodoBtn = document.createElement("button");
    addTodoBtn.textContent = "Add";
    addTodoBtn.type = "submit";

    const cancelTodoBtn = document.createElement("button");
    cancelTodoBtn.textContent = "Cancel";
    cancelTodoBtn.onclick = function() {
        modal.style.display = "none";
    }

    modalContent.appendChild(closeModal);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(form);
    modalContent.appendChild(addTodoBtn);
    modalContent.appendChild(cancelTodoBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function showModal() {
    const modal = document.getElementById("todo-modal");
    modal.style.display = "block";
}

function generateElements(form) {
    // Title
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.required = true;
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    // Description
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    const descriptionInput = document.createElement("textarea");
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    // Due date input
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date:';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    // Priority select
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority:";
    const prioritySelect = document.createElement("select");
    const priorities = ["None", "Low", "Medium", "High"];
    priorities.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        prioritySelect.appendChild(option);
    });
    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);
    // Notes
    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes:";
    const notesInput = document.createElement("textarea");
    form.appendChild(notesLabel);
    form.appendChild(notesInput);
    // Checklist 
    const checklistLabel = document.createElement('label');
    checklistLabel.textContent = 'Checklist:';
    const checklistInput = document.createElement('input');
    const addItemButton = document.createElement('button');
    addItemButton.textContent = 'Add item';
    addItemButton.onclick = function() {
        // Logic to add item to checklist
        console.log("ADDED ITEM");
    };
    form.appendChild(checklistLabel);
    form.appendChild(checklistInput);
    form.appendChild(addItemButton);
}

export {createModal, showModal};