import { tabSwitch } from "./taskHandler";

const setCurrentTab = (tab) => {
  const currentTab = document.querySelector(".current-tab");
  currentTab.innerText = tab;
  tabSwitch();
};

function addProjectNameOptions(name) {
  const projName = document.createElement("div");
  projName.innerText = name;
  document.querySelector(".project-options").appendChild(projName);
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
    setCurrentTab(newProjectName.innerText);
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
    default:
      filteredTask = taskArray.filter((task) => {
        return task.projectName == tab;
      });
  }

  filteredTask.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    taskContainer.innerText = `${task.title} -- ${task.details}`;
    taskContainer.setAttribute("data-index", `${i}`);
    main.appendChild(taskContainer);
  });
}

export { addProjectName, setCurrentTab, toggleElement };
