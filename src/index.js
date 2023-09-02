document.addEventListener("DOMContentLoaded", () => {
  const taskList = new TaskList();

  const newTaskForm = document.getElementById("create-task-form");
  const newTaskDescription = document.getElementById("new-task-description");
  const newTaskPriority = document.getElementById("new-task-priority");

  const taskUl = document.getElementById("tasks");

  const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    taskList.createNewTask(newTaskDescription.value);
    e.target.reset();
    renderApp();
  });

  taskUl.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.description);
      renderApp();
    }
  });

  class TaskList {
    constructor() {
      this.tasks = [];
    }
  
    createNewTask(description) {
      const newTask = new Task(description);
      this.tasks.push(newTask);
    }
  
    renderTasks() {
      return this.tasks.map((task) => task.render()).join("");
    }
  
    deleteTask(description) {
      this.tasks = this.tasks.filter((task) => task.description !== description);
    }
  }
  
  class Task {
    constructor(description) {
      this.description = description;
    }
  
    render() {
      return `
        <li>
          ${this.description}
          <button data-description="${this.description}">X</button>
        </li>
        `;
    }
  }
  

});