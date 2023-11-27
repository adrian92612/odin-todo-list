import "./main.css";
import addTask from "./taskHandler";
import { addProjectName, setCurrentTab, toggleElement } from "./domManipulator";

const taskFormListener = () => {
  const taskForm = document.querySelector(".task-form");
  taskForm.addEventListener("submit", (e) => {
    addTask(e);
    toggleElement(taskForm);
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

  const nextSeven = document.querySelector(".btn-upcoming");
  nextSeven.addEventListener("click", () => {
    setCurrentTab(nextSeven.innerText);
  });
};

const addTaskListener = () => {
  const addTaskBtn = document.querySelector(".add-task");
  const title = document.querySelector("#title");
  addTaskBtn.addEventListener("click", () => {
    toggleElement(document.querySelector(".task-form"));
  });
};

(function init() {
  taskFormListener();
  addProjectListener();
  tabListener();
  addTaskListener();
})();
