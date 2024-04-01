import Project from "../modules/project.js";

class ProjectManager {
    constructor() {
        this.projects = [];
        this.selectedProject = null;
    }

    // Add a new project
    addProject(name) {
        // const newProject = new Project(name);
        // this.projects.push(newProject);
        let project;
        if (typeof name === "string") {
            // Check if a project with the same name already exists
            const existingProject = this.projects.find(p => p.name === name);
            if (existingProject) {
                console.log(`Project with name "${projectOrName}" already exists.`);
                return;
            }
            project = new Project(name);
        } else if (name instanceof Project) {
            project = name;
        } else {
            console.error("Invalid argument passed to addProject. Expected a string or a Project object");
            return;
        }
        this.projects.push(project);
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

    // Set the currently selected project
    setSelectedProject(projectName) {
        this.selectedProject = projectName;
    }

    // Get the currently selected project
    getSelectedProject() {
        return this.selectedProject;
    }
}

export default ProjectManager;