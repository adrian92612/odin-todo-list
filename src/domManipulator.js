const setCurrentTab = (tab) => {
  const currentTab = document.querySelector(".current-tab");
  currentTab.innerText = tab;
};

function addProjectName(e) {
  e.preventDefault();
  const newProjectName = document.createElement("button");
  newProjectName.innerText = e.target.children[0].value.trim(); // e.target = form children[0] = input
  newProjectName.addEventListener("click", () => {
    setCurrentTab(newProjectName.innerText);
  });

  const projectList = document.querySelector(".project-list");
  projectList.appendChild(newProjectName);
  e.target.reset();
}

const toggleTaskForm = () => {
  const taskForm = document.querySelector("#task-form");
  if (taskForm.hasAttribute("style")) {
    taskForm.removeAttribute("style");
    return;
  }
  taskForm.setAttribute("style", "display:none");
};

export default function render(taskArray) {
  const main = document.querySelector("#main");
  main.innerHTML = "";
  taskArray.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    taskContainer.innerText = `${task.title} -- ${task.details}`;
    taskContainer.setAttribute("data-index", `${i}`);
    main.appendChild(taskContainer);
  });
}

export { addProjectName, setCurrentTab, toggleTaskForm };
