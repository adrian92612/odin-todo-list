function addProjectName(e) {
  e.preventDefault();
  const newProjectName = document.createElement("button");
  newProjectName.innerText = e.target.children[0].value.trim(); // e.target = form children[0] = input
  const projectList = document.querySelector(".project-list");

  projectList.appendChild(newProjectName);
  console.log(newProjectName);
  e.target.reset();
}

export default function render(taskArray) {
  const main = document.querySelector("#main");
  main.innerHTML = "";
  taskArray.forEach((task, i) => {
    console.log(i);
    const taskContainer = document.createElement("div");
    taskContainer.innerText = `${task.title} -- ${task.details}`;
    taskContainer.setAttribute("data-index", `${i}`);
    main.appendChild(taskContainer);
  });
}

export { addProjectName };
