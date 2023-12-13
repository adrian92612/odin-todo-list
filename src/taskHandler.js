import render, { toggleElement } from "./domManipulator";

const mainTaskArray = [];

class Task {
  constructor(projectName, title, details, dueDate, priority) {
    this.projectName = projectName;
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
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
  function padZero(date) {
    if (date < 10) {
      return "0" + date;
    }
    return date;
  }

  function today() {
    const date = new Date();
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
      date.getDate()
    )}`;
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
  const projName = document.querySelector("#project-selection").value;
  const date = document.querySelector("#date").value;
  const prio = document.querySelector("#priority-list").value;
  const task = new Task(projName, title.value, details.value, date, prio);

  if (projName == `Select a Project`) {
    return;
  }

  toggleElement(e.target);
  mainTaskArray.push(task);
  task.mainIndex = mainTaskArray.indexOf(task);
  localStorage.setItem("taskArray", JSON.stringify(mainTaskArray));
  render(mainTaskArray);
  e.target.reset();
}

export { getLocalDate, switchTab, removeFromArray };
