import { getLocalDate, removeFromArray, switchTab } from "./taskHandler";

const mainProjArray = [];

const setCurrentTab = (element) => {
  const currentTab = document.querySelector(".current-tab");
  currentTab.innerText = element.innerText;
  document.querySelector(".active-tab")?.classList.remove("active-tab");
  element.classList.add("active-tab");
  switchTab();
};

function addProjectNameOptions(name) {
  const projName = document.createElement("option");
  projName.innerText = name;
  projName.value = name;
  const projNameSelection = document.querySelector("#project-selection");
  projNameSelection.appendChild(projName);
}

function addProjectName(e) {
  e.preventDefault();
  const inputProjName = e.target.children[0].value.trim(); // e.target = form children[0] = input

  // Check for no name
  if (inputProjName == "" || inputProjName == null) {
    e.target.reset();
    return;
  }

  // Check for same name
  const projectList = document.querySelector(".project-list");
  const testName = Array.from(projectList.children).find((child) => {
    return child.innerText == inputProjName;
  });

  if (testName != undefined) {
    e.target.reset();
    return;
  }

  const newProjectName = document.createElement("button");
  newProjectName.classList.add("btn-project-tab");
  newProjectName.innerText = inputProjName;

  // Add tab switching
  newProjectName.addEventListener("click", () => {
    setCurrentTab(newProjectName);
    const selectedProjName = document.querySelector("#project-selection");
    selectedProjName.value = newProjectName.innerText;
  });

  mainProjArray.push(inputProjName);
  localStorage.setItem("projArray", JSON.stringify(mainProjArray));

  projectList.appendChild(newProjectName);
  addProjectNameOptions(newProjectName.innerText);
  e.target.reset();
}

const toggleElement = (element) => {
  if (element.classList.contains("hide-element")) {
    element.classList.remove("hide-element");
    return;
  }
  element.classList.add("hide-element");
};

const createTaskCard = (task, i) => {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-cards");
  taskCard.innerHTML = `
    <i class="fa fa-close">
    <h3>${task.title}</h3>
    <p>${task.details}</p>
    <p>${task.dueDate}</p>
    <p>Priority: ${task.priority}</p>
    <p>main index = ${task.mainIndex}<p/>
  `;

  taskCard.addEventListener("click", () => {
    removeFromArray(task.mainIndex);
    taskCard.remove();
  });
  return taskCard;
};

export default function render(taskArray) {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  const tab = document.querySelector(".current-tab").innerText;
  let filteredTask = [];
  switch (tab) {
    case "All":
      filteredTask = taskArray;
      break;
    case "Today":
      filteredTask = taskArray.filter((task) => {
        return task.dueDate == getLocalDate().today();
      });
      break;
    case "Upcoming":
      filteredTask = taskArray.filter((task) => {
        return (
          task.dueDate > getLocalDate().today() &&
          task.dueDate <= getLocalDate().upcoming(7)
        );
      });
      break;
    default:
      filteredTask = taskArray.filter((task) => {
        return task.projectName == tab;
      });
  }

  filteredTask.forEach((task, i) => {
    main.appendChild(createTaskCard(task, i));
  });
}

export { addProjectName, setCurrentTab, toggleElement };
