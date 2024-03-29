import addTask, {
  getLocalDate,
  getMainTaskArray,
  removeFromArray,
  removeTasksFromProjects,
  switchTab,
  updateLocStorArray,
} from "./taskHandler";

let mainProjArray = [];

const setCurrentTab = (element) => {
  const currentTab = document.querySelector(".current-tab");
  currentTab.innerText = element.innerText;
  document.querySelector(".active-tab")?.classList.remove("active-tab");
  element.classList.add("active-tab");
  switchTab();
};

const toggleForm = (form, show) => {
  const createTaskForm = document.querySelector(".task-form");
  const editTaskForm = document.querySelector(".edit-task");
  const mainContent = document.querySelector(".main");

  createTaskForm.classList.add("hide-element");
  editTaskForm.classList.add("hide-element");
  mainContent.classList.remove("blur-main");
  if (show) {
    form.classList.remove("hide-element");
    mainContent.classList.add("blur-main");
    return;
  }
};

function addProjectNameOptions(name) {
  const projName = document.createElement("option");
  projName.innerText = name;
  projName.value = name;
  const projNameSelection = document.querySelector("#project-selection");
  projNameSelection.appendChild(projName);
}

function removeProjectNameOption(name) {
  const projects = [...document.querySelector("#project-selection").children];
  projects.forEach((proj) => {
    if (proj.innerText == name) {
      proj.remove();
    }
  });
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
  newProjectName.innerHTML = inputProjName;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  deleteBtn.classList.add("btn-trash");

  const deleteContainer = document.createElement("div");
  deleteContainer.classList.add("delete-container");
  deleteContainer.classList.add("hide-element");
  const confirmSentence = document.createElement("p");
  confirmSentence.innerText = `Remove?`;
  const yesBtn = document.createElement("button");
  yesBtn.innerText = `Yes`;
  const noBtn = document.createElement("button");
  noBtn.innerText = `No`;
  deleteContainer.append(confirmSentence, yesBtn, noBtn);

  const container = document.createElement("div");
  container.classList.add("proj-container");
  container.append(newProjectName, deleteBtn, deleteContainer);

  deleteBtn.addEventListener("click", () => {
    deleteContainer.classList.remove("hide-element");
  });

  noBtn.addEventListener("click", () => {
    deleteContainer.classList.add("hide-element");
  });

  yesBtn.addEventListener("click", () => {
    mainProjArray = mainProjArray.filter((name) => name !== inputProjName);
    localStorage.setItem("projArray", JSON.stringify(mainProjArray));
    setCurrentTab(document.querySelector(".nav-options").firstElementChild); // All tab
    removeProjectNameOption(inputProjName);
    removeTasksFromProjects(inputProjName);
    container.remove();
  });

  // Add tab switching
  newProjectName.addEventListener("click", () => {
    setCurrentTab(newProjectName);
    const selectedProjName = document.querySelector("#project-selection");
    selectedProjName.value = newProjectName.innerText;
  });

  mainProjArray.push(inputProjName);
  localStorage.setItem("projArray", JSON.stringify(mainProjArray));

  projectList.appendChild(container);
  addProjectNameOptions(inputProjName);
  e.target.reset();
}

const taskCardCompleted = (task, card) => {
  task.isCompleted = !task.isCompleted;
  updateLocStorArray();
  task.isCompleted
    ? card.classList.add("task-completed")
    : card.classList.remove("task-completed");

  updateTaskCounter();
};

const taskEdit = (task) => {
  const editTaskForm = document.querySelector(".edit-task");
  toggleForm(editTaskForm, true);

  const editTitle = document.querySelector("#edit-title");
  editTitle.value = task.title;
  const editDetails = document.querySelector("#edit-details");
  editDetails.value = task.details;
  const editDate = document.querySelector("#edit-date");
  editDate.value = task.dueDate;
  const editPriority = document.querySelector("#edit-priority");
  editPriority.value = task.priority;

  editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    task.title = editTitle.value;
    task.details = editDetails.value;
    task.dueDate = editDate.value;
    task.priority = editPriority.value;
    toggleForm(editTaskForm, false);
    updateLocStorArray();
    render(getMainTaskArray());
  });

  const editDiscardBtn = document.querySelector("#edit-discard");
  editDiscardBtn.addEventListener("click", () =>
    toggleForm(editTaskForm, false)
  );
};

const createTaskCard = (task) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("task-cards");
  if (task.isCompleted) cardContainer.classList.add("task-completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-card-delete");
  deleteBtn.innerHTML = `<i class="fa fa-close fa-lg"></i>`;

  const title = document.createElement("h3");
  title.innerText = task.title;
  const details = document.createElement("p");
  details.innerText = task.details;
  const dueDate = document.createElement("p");
  dueDate.innerText = `Due Date: ${task.dueDate}`;
  const priority = document.createElement("p");
  priority.innerText = `Priority: ${task.priority}`;

  const editBtn = document.createElement("button");
  editBtn.innerHTML =
    '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
  editBtn.classList.add("btn-card-edit");

  const taskDoneBtn = document.createElement("button");
  taskDoneBtn.innerHTML = `<i class="fa fa-check-square-o" aria-hidden="true"></i>`;
  taskDoneBtn.classList.add("btn-card-done");

  const editDoneContainer = document.createElement("div");
  editDoneContainer.append(editBtn, taskDoneBtn);

  deleteBtn.addEventListener("click", () => {
    removeFromArray(task.mainIndex);
    cardContainer.remove();
  });

  editBtn.addEventListener("click", () => {
    taskEdit(task);
  });

  taskDoneBtn.addEventListener("click", () =>
    taskCardCompleted(task, cardContainer)
  );

  cardContainer.append(
    deleteBtn,
    title,
    details,
    dueDate,
    priority,
    editDoneContainer
  );
  return cardContainer;
};

const updateTaskCounter = () => {
  const completed = document.querySelector(".task-completed-counter");
  const pending = document.querySelector(".task-pending-counter");
  let completedCount = 0;
  let pendingCount = 0;

  const main = document.querySelector(".main");
  Array.from(main.children).forEach((task) => {
    task.classList.contains("task-completed")
      ? completedCount++
      : pendingCount++;
  });

  completed.innerText = `${completedCount} Completed`;
  pending.innerText = `${pendingCount} Pending`;
};

const sideBarListener = () => {
  const addProjectForm = document.getElementById("add-project");
  addProjectForm.addEventListener("submit", (e) => {
    addProjectName(e);
  });

  const navTabOptions = document.querySelector(".nav-options").children;
  Array.from(navTabOptions).forEach((tab) => {
    tab.addEventListener("click", () => {
      setCurrentTab(tab);
    });
  });
  navTabOptions[1].click();

  const sideBar = document.querySelector(".side-bar");
  const hideSideBar = document.querySelector(".btn-hide-side-bar");
  hideSideBar.addEventListener("click", () =>
    sideBar.classList.remove("show-side-bar")
  );
  const showSideBar = document.querySelector(".btn-side-bar");
  showSideBar.addEventListener("click", () =>
    sideBar.classList.add("show-side-bar")
  );
};

const createTaskListener = () => {
  const taskForm = document.querySelector(".task-form");
  taskForm.addEventListener("submit", (e) => {
    addTask(e);
    toggleForm(taskForm, false);
  });

  const title = document.querySelector("#title");
  const addTaskBtn = document.querySelector(".add-task");
  addTaskBtn.addEventListener("click", () => {
    setTimeout(() => title.focus(), 10);
    toggleForm(taskForm, true);
  });

  const minimizeBtn = document.querySelector("#btn-form-close");
  minimizeBtn.addEventListener("click", () => toggleForm(taskForm, false));

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") toggleForm(taskForm, false);
  });
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

  filteredTask.forEach((task) => main.append(createTaskCard(task)));
  updateTaskCounter();
}

export { createTaskListener, sideBarListener };
