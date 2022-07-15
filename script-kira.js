//=== header and navbar ===//

const navBarBtn = document.querySelector("[data-navBar-btn]");
const navItems = document.querySelector("[data-nav-items]");
navBarBtn.addEventListener("click", function () {
  navBarBtn.classList.toggle("navBtn-toggler");
  navItems.classList.toggle("navItems-toggler");
});

//=== About Carousel ===//
const carouselItems = document.querySelectorAll("[data-carousel-item]");
const carouselNav = document.querySelector("[data-carousel-nav]");

// === Create CarouselNavBtns Dynamically

let aboutCarNavItems = [];

for (let i = 0; i < carouselItems.length; i++) {
  const newSpanEl = document.createElement("span");
  newSpanEl.setAttribute("date-carousel-nav-item", "");
  newSpanEl.classList.add("carousel-nav-item");

  aboutCarNavItems.push(newSpanEl);
}

aboutCarNavItems[0].classList.add("selected");

for (let i = 0; i < aboutCarNavItems.length; i++) {
  carouselNav.appendChild(aboutCarNavItems[i]);
}

// ===== Carousel Functions

let index = 0;

document
  .querySelector("[data-carousel-prev]")
  .addEventListener("click", moveToPrev);

document
  .querySelector("[data-carousel-next]")
  .addEventListener("click", moveToNext);

aboutCarNavItems.forEach(function (item, i) {
  item.addEventListener("click", function () {
    removeOriginCls();
    index = i;
    addNewCls();
  });
});

// =====

// ==== Use to remove all original classes

function removeOriginCls() {
  carouselItems.forEach(function (item) {
    item.classList.remove("visible");
  });
  aboutCarNavItems.forEach(function (item) {
    item.classList.remove("selected");
  });
}

// === Add classes to elements with specific Index No

function addNewCls() {
  aboutCarNavItems[index].classList.add("selected");
  carouselItems[index].classList.add("visible");
}

// === Move to previous img

function moveToPrev() {
  removeOriginCls();

  if (index === 0) {
    index = carouselItems.length - 1;
  } else {
    index--;
  }
  addNewCls(index);
}
// === Move to next img

function moveToNext() {
  removeOriginCls();

  if (index === carouselItems.length - 1) {
    index = 0;
  } else {
    index++;
  }
  addNewCls(index);
}
