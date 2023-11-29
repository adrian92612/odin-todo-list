import render, { toggleElement } from "./domManipulator";

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

const switchTab = () => {
  render(mainTaskArray);
};

const getLocalDate = () => {
  function today() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  function upcoming(days) {
    const upcoming = new Date(today());
    upcoming.setDate(upcoming.getDate() + days);
    return upcoming.toJSON().slice(0, 10);
  }

  return { today, upcoming };
};

const removeFromArray = (index) => {
  mainTaskArray.splice(index, 1);
  //Resets the mainIndex of tasks in the array
  mainTaskArray.forEach((task, i) => {
    task.mainIndex = i;
  });
};

export default function addTask(e) {
  e.preventDefault();
  const projName = document.querySelector("#project-name").innerText;
  const date = document.querySelector("#date").value;
  const task = new Task(projName, title.value, details.value, date);

  if (projName == `Select a Project`) {
    console.log(`select project name`);
    return;
  }

  toggleElement(e.target);
  mainTaskArray.push(task);
  task.mainIndex = mainTaskArray.indexOf(task);
  render(mainTaskArray);
  e.target.reset();
}

export { getLocalDate, switchTab, removeFromArray };
