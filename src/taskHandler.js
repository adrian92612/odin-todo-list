import render from "./domManipulator";

const mainTaskArray = [];

class Task {
  constructor(title, details) {
    this.title = title;
    this.details = details;
    this.projectName;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  setDetails(newDetails) {
    this.details = newDetails;
  }

  setProjectName(newProjectName) {
    this.projectName = newProjectName;
  }
}

const createSubTaskArray = (projectName) => {
  const subTaskArray = [];
  mainTaskArray.forEach((e) => {
    if (e.projectName == projectName) {
      subTaskArray.push(e);
    }
  });

  return subTaskArray;
};

const tabSwitch = (tab) => {
  if (tab == "All") {
    render(mainTaskArray);
    return;
  }
  render(createSubTaskArray(tab));
};

export default function addTask(e) {
  e.preventDefault();
  const task = new Task(title.value, details.value);
  mainTaskArray.push(task);
  const currentTab = document.querySelector(".current-tab");
  if (currentTab.innerText != "All") {
    task.setProjectName(currentTab.innerText);
    render(createSubTaskArray(currentTab.innerText));
    e.target.reset();
    return;
  }
  render(mainTaskArray);
  e.target.reset();
}

export { tabSwitch };
