import { getLocalDate, tabSwitch } from "./taskHandler";

const setCurrentTab = (element) => {
  const currentTab = document.querySelector(".current-tab");
  currentTab.innerText = element.innerText;
  document.querySelector(".active-tab")?.classList.remove("active-tab");
  element.classList.add("active-tab");
  tabSwitch();
};

function addProjectNameOptions(name) {
  const projName = document.createElement("div");
  projName.innerText = name;
  const projNameContainer = document.querySelector(".project-options");
  projNameContainer.appendChild(projName);

  projName.addEventListener("click", () => {
    const selectedProjName = document.querySelector("#project-name");
    selectedProjName.innerText = name;
    toggleElement(projNameContainer);
  });
}

function addProjectName(e) {
  e.preventDefault();
  const newProjectName = document.createElement("button");
  newProjectName.innerText = e.target.children[0].value.trim(); // e.target = form children[0] = input

  // Check for no name
  if (newProjectName.innerText == "" || newProjectName == null) {
    e.target.reset();
    return;
  }

  // Check for same name
  const projectList = document.querySelector(".project-list");
  const testName = Array.from(projectList.children).find((child) => {
    return child.innerText == newProjectName.innerText;
  });
  if (testName != undefined) {
    e.target.reset();
    return;
  }

  // Add tab switching
  newProjectName.addEventListener("click", () => {
    setCurrentTab(newProjectName);
  });

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
  if (element == document.querySelector(".task-form")) {
    document.querySelector("#project-name").innerText = `Select a Project`;
  }
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
    const taskContainer = document.createElement("div");
    taskContainer.innerText = `${task.title} -- ${task.details} -- ${task.dueDate}`;
    taskContainer.setAttribute("data-index", `${i}`);
    main.appendChild(taskContainer);
  });
}

export { addProjectName, setCurrentTab, toggleElement };
