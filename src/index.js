import "./main.css";
import addTask from "./taskHandler";
import { addProjectName } from "./domManipulator";

const taskFormListener = () => {
  const taskForm = document.getElementById("task-form");
  taskForm.addEventListener("submit", (e) => {
    addTask(e);
  });
};

const addProjectListener = () => {
  const addProjectForm = document.getElementById("add-project");
  addProjectForm.addEventListener("submit", (e) => {
    addProjectName(e);
  });
};

(function init() {
  taskFormListener();
  addProjectListener();
})();
