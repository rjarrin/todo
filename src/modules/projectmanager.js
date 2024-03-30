import Project from "../modules/project.js";

class ProjectManager {
    constructor() {
        this.projects = [];
    }

    // Add a new project
    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
    }

    // Get a project by name
    getProjectByName(name) {
        return this.projects.find(project => project.name === name);
    }

    // Removes a project by its name
    removeProject(name) {
        const index = this.projects.findIndex(project => project.name === name);
        if (index > -1) {
            this.projects.splice(index, 1);
        }
    }

    // Update a project name
    updateProjectName(oldName, newName) {
        const project = this.getProjectByName(oldName);
        if (project) {
            project.name = newName;
        }
    }

    // Returns all projects
    getAllProjects() {
        return this.projects;
    }
}

export default ProjectManager;