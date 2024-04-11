//import ProjectManager from "./projectmanager.js";
import Project from "./project";
import Todo from "./todo.js";
import { projectManager } from "./layout.js";

// Save projects to localStorage
export function saveProjects() {
    const serializedProjects = JSON.stringify(projectManager.getAllProjects().map(project => ({
        name: project.name,
        todos: project.todos.map(todo => ({
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate ? todo.dueDate.toISOString() : "",
            creationDate: todo.creationDate,
            priority: todo.priority,
            notes: todo.notes,
            checklist: todo.checklist
        }))
    })));
    localStorage.setItem("projects", serializedProjects);
}

// Load projects from localStorage
export function loadProjects() {
    const serializedProjects = localStorage.getItem("projects");
    if (!serializedProjects) return;

    const projectsData = JSON.parse(serializedProjects);
    projectsData.forEach(projectData => {
        const project = new Project(projectData.name);
        projectData.todos.forEach(todoData => {
            const dueDate = todoData.dueDate ? new Date(todoData.dueDate) : null;
            const todo = new Todo(
                todoData.title,
                todoData.description,
                //new Date(todoData.dueDate),
                dueDate,
                new Date(todoData.creationDate),
                todoData.priority,
                todoData.notes,
                todoData.checklist
            );
            project.addTodo(todo);
        });
        console.log("CALLED ADDPROJECT FROM PERSISTENCE");
        projectManager.addProject(project);
    });
}