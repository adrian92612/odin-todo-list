import "./main.css";
import { mergeTaskArray } from "./taskHandler";
import {
  addProjectName,
  createTaskListener,
  setCurrentTab,
} from "./domManipulator";

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

const addExistingProjects = () => {
  const projects = JSON.parse(localStorage.getItem("projArray"));
  if (projects == undefined) {
    return;
  }
  const projInputBox = document.querySelector("#add-new-project");
  const addProjBtn = document.querySelector("#add-project-btn");
  projects.forEach((proj) => {
    projInputBox.value = proj;
    addProjBtn.click();
  });
};

(function init() {
  // taskFormListener();
  addProjectListener();
  tabListener();
  // addTaskListener();
  createTaskListener();

  if (localStorage.length > 0) {
    addExistingProjects();
    mergeTaskArray(JSON.parse(localStorage.getItem("taskArray")));
  }
})();
