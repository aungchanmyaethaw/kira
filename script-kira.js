// header and navbar

const navBarBtn = document.querySelector("[data-navBar-btn]");
const navItems = document.querySelector("[data-nav-items]");
navBarBtn.addEventListener("click", function () {
  navBarBtn.classList.toggle("navBtn-toggler");
  navItems.classList.toggle("navItems-toggler");
});
