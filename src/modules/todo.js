import {isBefore, format} from 'date-fns';

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

    // Check if a Todo's due date has passed
    isOverdue() {
        const currentDate = new Date();
        return isBefore(this.dueDate, currentDate);
    }

    // Formats the date of a todo item into more readable format (for use in UI)
    formatDueDate() {
        return format(this.dueDate, "yyyy-MM-dd");
    }

    // Add a note to the todo item
    addNote(note) {
        this.notes.push(note);
    }

    // Remove a note from a todo item
    removeNote(note) {
        const index = this.notes.indexOf(note);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
    }

    // Add an item to the checklist of a todo item
    addChecklistItem(item) {
        this.checklist.push(item);
    }

    // Remove an item from the checklist of a todo item
    removeChecklistItem(item) {
        const index = this.checklist.indexOf(item);
        if (index > -1) {
            this.checklist.splice(index, 1);
        }
    }
}

export default Todo;