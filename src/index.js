import "./main.css";
import addTask from "./taskHandler";
import { addProjectName, setCurrentTab } from "./domManipulator";

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

const tabListener = () => {
  const all = document.querySelector(".btn-all");
  all.addEventListener("click", () => {
    setCurrentTab(all.innerText);
  });
  all.click();

  const today = document.querySelector(".btn-today");
  today.addEventListener("click", () => {
    setCurrentTab(today.innerText);
  });

  const nextSeven = document.querySelector(".btn-nextSeven");
  nextSeven.addEventListener("click", () => {
    setCurrentTab(nextSeven.innerText);
  });
};

(function init() {
  taskFormListener();
  addProjectListener();
  tabListener();
})();
