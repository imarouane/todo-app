const toggleModeBtn = document.querySelector(".todo__header--toggle-btn");
const htmlElement = document.documentElement;
const storedMode = localStorage.getItem("mode");

if (storedMode) {
  htmlElement.dataset.theme = storedMode;
  toggleModeBtn.innerHTML =
    storedMode === "dark"
      ? '<img src="images/icon-sun.svg" alt="theme-icon" />'
      : '<img src="images/icon-moon.svg" alt="theme-icon" />';
}

toggleModeBtn.addEventListener("click", () => {
  let mode = htmlElement.dataset.theme === "dark" ? "light" : "dark";
  htmlElement.dataset.theme = mode;
  toggleModeBtn.innerHTML =
    mode === "dark"
      ? '<img src="images/icon-sun.svg" class="from-left" alt="theme-icon" />'
      : '<img src="images/icon-moon.svg" class="from-left" alt="theme-icon" />';
  localStorage.setItem("mode", mode);
});
