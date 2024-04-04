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

    // INPUT FIELDS HERE

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

export {createModal, showModal};