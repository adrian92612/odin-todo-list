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
