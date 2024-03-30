class Todo {
    constructor(title, description, dueDate, creationDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.creationDate = creationDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    // Toggle the completion status of a Todo item
    toggleComplete() {
        this.status = this.status === "complete" ? "incomplete" : "complete";
    }

    // Edit the properties of a Todo item
    editTodo(newTitle, newDescription, newDueDate, newPriority, newNotes, newChecklist) {
        this.title = newTitle || this.title;
        this.description = newDescription || this.description;
        this.dueDate = newDueDate || this.dueDate;
        this.priority = newPriority || this.priority;
        this.notes = newNotes || this.notes;
        this.checklist = newChecklist || this.checklist;
    }
}