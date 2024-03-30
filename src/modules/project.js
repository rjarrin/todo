class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
    
    // Add task to project
    addTodo(todo) {
        this.todos.push(todo);
    }

    // Remove task from project
    removeTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }

    // Find a todo item by its title within the project
    findTodo(title) {
        return this.todos.find(todo => todo.title === title);
    }

    // Update a todo item within the project
    updateTodo(oldTodo, newTodo) {
        const index = this.todos.indexOf(oldTodo);
        if (index > -1) {
            this.todos[index] = newTodo;
        }
    }

    // Get all todo items within the project that match a specific priority
    getTodosByPriority(priority) {
        return this.todos.filter(todo => todo.priority === priority);
    }

    // Get all todo items within the project that are due before a specific date
    getTodosDueBefore(date) {
        return this.todos.filter(todo => todo.dueDate < date);
    }

    // Get all todo items within the project that are due after a specific date
    getTodosDueAfter(date) {
        return this.todos.filter(todo => todo.dueDate > date);
    }

    // Get all todo items within the project that are marked complete
    getTodosCompleted() {
        return this.todos.filter(todo => todo.status === "complete");
    }

    // Get all todo items within the project that are not marked as complete
    getTodosIncomplete() {
        return this.todos.filter(todo => todo.status !== "complete");
    }
}

export default Project;