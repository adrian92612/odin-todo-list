import "./main.css";
import addTask, { getLocalDate } from "./taskHandler";
import { addProjectName, setCurrentTab, toggleElement } from "./domManipulator";

const taskFormListener = () => {
  const taskForm = document.querySelector(".task-form");
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
  const navTabOptions = document.querySelector(".nav-options").children;
  Array.from(navTabOptions).forEach((tab) => {
    tab.addEventListener("click", () => {
      setCurrentTab(tab);
    });
  });
  navTabOptions[1].click();
};

// const formProjectsListner = () => {
//   const formProjectOptions = document.querySelector("#project-name");
//   formProjectOptions.addEventListener("click", () => {
//     toggleElement(document.querySelector(".project-options"));
//   });
// };

const addTaskListener = () => {
  const addTaskBtn = document.querySelector(".add-task");
  const title = document.querySelector("#title");
  const taskForm = document.querySelector(".task-form");
  addTaskBtn.addEventListener("click", () => {
    setTimeout(() => {
      title.focus();
    }, 10);
    toggleElement(taskForm);
  });

  const minimizeBtn = document.querySelector("#btn-form-close");
  minimizeBtn.addEventListener("click", () => {
    toggleElement(taskForm);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !taskForm.classList.contains("hide-element")) {
      toggleElement(taskForm);
    }
  });
};

(function init() {
  taskFormListener();
  addProjectListener();
  tabListener();
  addTaskListener();
  console.log(getLocalDate().today());
})();
