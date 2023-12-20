import "./main.css";
import { mergeTaskArray } from "./taskHandler";
import { createTaskListener, sideBarListener } from "./domManipulator";

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
  sideBarListener();
  createTaskListener();

  if (localStorage.length > 0) {
    addExistingProjects();
    mergeTaskArray(JSON.parse(localStorage.getItem("taskArray")));
  }
})();
