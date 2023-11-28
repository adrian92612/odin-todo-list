import render from "./domManipulator";
import { toggleElement } from "./domManipulator";

const mainTaskArray = [];

class Task {
  constructor(projectName, title, details, dueDate) {
    this.projectName = projectName;
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.mainIndex;
  }

  setProjectName(newProjectName) {
    this.projectName = newProjectName;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }

  setDetails(newDetails) {
    this.details = newDetails;
  }

  setDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  setMainIndex(newIndex) {
    this.mainIndex = newIndex;
  }
}

const tabSwitch = () => {
  render(mainTaskArray);
};

const checkUpcomingTasks = (taskDate) => {};

export default function addTask(e) {
  e.preventDefault();
  const projName = document.querySelector("#project-name").innerText;
  const date = document.querySelector("#date").value;
  const today = new Date().toJSON().slice(0, 10);
  const task = new Task(projName, title.value, details.value, date);

  if (projName == `Select a Project`) {
    console.log(`select project name`);
    return;
  }

  console.log("wow");
  toggleElement(e.target);
  mainTaskArray.push(task);
  render(mainTaskArray);
  e.target.reset();
}

export { tabSwitch };
