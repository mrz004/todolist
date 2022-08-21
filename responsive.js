if (window.screen.width && window.screen.width <= 1024) {
  navUl.style.display = "none";
  hambug.addEventListener("click", () => {
    if (navUl.style.display === "none") {
      navUl.style.display = "flex";
      hambug.style.animation = "openHam 500ms ease forwards";
    } else {
      navUl.style.display = "none";
      hambug.style.animation = "closeHam 500ms ease forwards";
    }
  });
  searchToDoBtn.addEventListener("click", () => {
    navUl.style.display = "none";
    hambug.style.animation = "closeHam 500ms ease forwards";
  });
}
