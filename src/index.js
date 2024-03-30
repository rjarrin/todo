import './style.css';
import generateTemplate from './modules/layout.js';
import Todo from './modules/todo.js';
import ProjectManager from './modules/projectmanager.js';

generateTemplate();

const myTodo = new Todo('Buy groceries', 'Buy milk, eggs, and bread', new Date(), new Date(), 'High', 'Remember to buy organic milk', []);
console.log(myTodo.title); // Should log 'Buy groceries'
myTodo.toggleComplete();
console.log(myTodo.status); // Should log 'complete'

const projectManager = new ProjectManager();
projectManager.addProject("Default Project");
console.log(projectManager);