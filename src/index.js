import "./main.css";
import header from "./components/header";
import sideBar from "./components/sidebar";
import footer from "./components/footer";

(function initiate() {
  const root = document.getElementById(`root`);

  root.appendChild(header());
  root.appendChild(sideBar());
  root.appendChild(footer());
})();
