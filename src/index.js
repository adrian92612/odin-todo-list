import "./main.css";
import addTask from "./taskHandler";

(function init() {
  const taskForm = document.getElementById("task-form");
  taskForm.addEventListener("submit", (e) => addTask(e));
})();
