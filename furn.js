"use strict";

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".header__menu-button");
const btnIcones = document.querySelectorAll(".header__menu-button--icon");
const mBi1 = document.querySelector(".header__menu-button--icon-1");
const mBi2 = document.querySelector(".header__menu-button--icon-2");
const mBi3 = document.querySelector(".header__menu-button--icon-3");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const allSections = document.querySelectorAll("section");

console.log(allSections);

//MODAL
const animateAndOpen = function () {
  //BUTTON ANIMATION
  mBi1.classList.toggle("header__menu-button--icon-1-animate");
  mBi2.classList.toggle("header__menu-button--icon-2-animate");
  mBi3.classList.toggle("header__menu-button--icon-3-animate");
  //OPEN MODAL
  menu.classList.toggle("menu--toggle");
  menuBtn.classList.toggle("header__menu-button-background");
};

menuBtn.addEventListener("click", animateAndOpen);

//REVEAL SECTION

const revealSection = function (entries, observer) {
  // entries.forEach((entry) => console.log(entry));
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
});

//SLIDER
//FUNCTION
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

/*GO TO SLIDE*/
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

let curSlide = 0;
const maxSlide = slides.length;
/*NEXT SLIDE*/
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
/*PREVIOUS SLIDE*/
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
/*ACTIVATE DOTS*/
const activateDot = function (s) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((d) => d.classList.remove("dots__dot--activate"));

  document
    .querySelector(`.dots__dot[data-slide="${s}"]`)
    .classList.add("dots__dot--activate");
};
/*INITIAL STATE*/
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();
//EVENT HANDLERS
/*BUTTONS*/
btnLeft.addEventListener("click", nextSlide);
btnRight.addEventListener("click", prevSlide);
/*ARROW KEYS*/
document.addEventListener("keydown", function (e) {
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});
/*DOTS*/
dotContainer.addEventListener("click", function (e) {
  console.log(e.target.dataset);
  const { slide } = e.target.dataset;
  console.log(slide);
  goToSlide(slide);
  activateDot(slide);
});
