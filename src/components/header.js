export default function header() {
  const headerContainer = document.createElement("header");
  const logo = document.createElement("h3");
  logo.innerText = `To do List`;
  headerContainer.appendChild(logo);
  return headerContainer;
}
