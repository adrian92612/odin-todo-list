import render from "./domManipulator";

let mainTaskArray = [];
let subTaskArray = [];

class Task {
  constructor(title, details, projectName) {
    this.title = title;
    this.details = details;
    this.projectName = projectName;
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

export default function addTask(e) {
  e.preventDefault();
  const task = new Task(title.value, details.value, projectName.value);
  mainTaskArray.push(task);
  render(mainTaskArray);
  e.target.reset();
}
