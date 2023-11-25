import render from "./domManipulator";

const mainTaskArray = [];

class Task {
  constructor(title, details) {
    this.title = title;
    this.details = details;
    this.projectName;
    this.mainIndex;
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

  setMainIndex(newIndex) {
    this.mainIndex = newIndex;
  }
}

const tabSwitch = () => {
  render(mainTaskArray);
};

const setTaskProjectName = (task) => {
  const currentTab = document.querySelector(".current-tab").innerText;
  if (currentTab != "All") {
    task.setProjectName(currentTab);
  }
};

export default function addTask(e) {
  e.preventDefault();
  console.log(e);
  const task = new Task(title.value, details.value);
  mainTaskArray.push(task);

  setTaskProjectName(task);
  render(mainTaskArray);
  e.target.reset();
}

export { tabSwitch };
