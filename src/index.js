import "./main.css";
import addTask from "./taskHandler";

const taskFormListener = () => {
  const taskForm = document.getElementById("task-form");
  taskForm.addEventListener("submit", (e) => {
    addTask(e);
    taskForm.reset();
  });
};

const addProjectListener = () => {};

(function init() {
  taskFormListener();
})();
