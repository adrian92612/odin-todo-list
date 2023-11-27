import render from "./domManipulator";

const mainTaskArray = [];

class Task {
  constructor(projectName, title, details) {
    this.projectName = projectName;
    this.title = title;
    this.details = details;
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

export default function addTask(e) {
  e.preventDefault();
  const projName = document.querySelector("#project-name").innerText;
  const task = new Task(projName, title.value, details.value);
  mainTaskArray.push(task);
  render(mainTaskArray);
  e.target.reset();
}

export { tabSwitch };
