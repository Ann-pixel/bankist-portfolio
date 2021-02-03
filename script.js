"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const head = document.querySelector(".header");
const sections = document.querySelectorAll(".section");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const navLinks = document.querySelector(".nav__links");
const navBar = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const imageTargets = document.querySelectorAll("img[data-src]");

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const dotContainer = document.querySelector(".dots");
function openModal(evt) {
  evt.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
btnsOpenModal.forEach(function (node) {
  node.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", function (evt) {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});
//--smooth scrolling to all nav links: not ideal.
// document.querySelectorAll(".nav__link").forEach(function (node) {
//   node.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
//..instead use evt delegation. add clbk function to a parent element and handle the event there.
//---smooth scroll
navLinks.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("nav__link")) {
    const id = evt.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//--operations tab
tabContainer.addEventListener("click", function (evt) {
  const clicked = evt.target.closest(".operations__tab");

  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//--nav hover function (changing opacity)
function handleHover(evt, opacity) {
  if (evt.target.classList.contains("nav__link")) {
    const link = evt.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((sib) => {
      if (sib !== link) sib.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}
navBar.addEventListener("mouseover", (evt) => handleHover(evt, 0.5));
navBar.addEventListener("mouseout", (evt) => handleHover(evt, 1));

//----sticky navigation---
//using scroll event is not ideal. coz scroll fires for every little scroll
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   if (window.scrollY >= initialCords.top) {
//     navBar.classList.add("sticky");
//   } else {
//     navBar.classList.remove("sticky");
//   }
// });
// --Intersection Observer API
// const obsCallBk = function (entries, observer) {
//   entries.forEach((entry) => console.log(entry));
// };
// const obsOptions = { root: null, threshold: [0, 0.2] };
// const observer = new IntersectionObserver(obsCallBk, obsOptions);
// observer.observe(section1);

function headCall(entries, headObserver) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entries); //entries is an array with 1 element. so we destructured it.
  if (!entry.isIntersecting) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}
const navHt = navBar.getBoundingClientRect().height;

const headOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHt}px`,
};

const headObserver = new IntersectionObserver(headCall, headOptions);
headObserver.observe(head);

//--- display sections ---
function sectionCall(entries, section) {
  const [entry] = entries;
  const element = entry.target;
  if (!entry.isIntersecting) return;
  element.classList.remove("section--hidden");
  sectionObserver.unobserve(element);
}
const sectionObj = {
  root: null,
  threshold: 0.12,
};
const sectionObserver = new IntersectionObserver(sectionCall, sectionObj);
sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
//---lazy loading images---

function imageCall(entries) {
  const [entry] = entries;
  const image = entry.target;
  if (!entry.isIntersecting) return;
  image.src = image.dataset.src;
  image.addEventListener("load", function () {
    image.classList.remove("lazy-img");
    imageObserver.unobserve(image);
  });
}
const imageObj = {
  root: null,
  threshold: 0.2,
  //  rootMargin: "200px", //so that the user doesnt know we're lazy loading the images
};
const imageObserver = new IntersectionObserver(imageCall, imageObj);
imageTargets.forEach((image) => imageObserver.observe(image));

//----sliders----
//for test
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(.5)";
// slider.style.overflow = "visible";
let currentSlide = 0;
const maxSlide = slides.length;
function init() {
  goToSlide(currentSlide);
  createDots();
  activateDot(0);
}
init();

function goToSlide(currentSlide) {
  slides.forEach(
    (slide, idx) =>
      (slide.style.transform = `translateX(${(idx - currentSlide) * 100}%)`)
  );
}
function nextSlide() {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}
function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}
function createDots() {
  slides.forEach((_, idx) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class = "dots__dot" data-slide ="${idx}"></button>`
    );
  });
}
function activateDot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

//evt handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (evt) {
  // if (evt.key === "ArrowLeft") prevSlide();
  if (evt.key === "ArrowRight") nextSlide();
  evt.key === "ArrowLeft" && prevSlide();
});
dotContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("dots__dot")) {
    const { slide } = evt.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// console.log(sections);
// const header = document.querySelector(".header");
// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.innerHTML =
//   'We use cookies! <button class= "btn btn--close-cookie">Got it!</button>';
//append and prepend add children.
//before and after add outside the element as a sibling.
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// // header.after(message);

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });
// message.style.backgroundColor = "#37383d"; //this sets inline styles.
// message.style.width = "120%";
// console.log(message.style.backgroundColor); //this only reads inline styles.not css.
// // console.log(message.style.color); //no o/p. coz no inline style called height.

// console.log(getComputedStyle(message).color); //styles that appear on the page.
// // document.documentElement.style.setProperty("--color-primary", "orangered"); //changing variables in JS

//---used to add scroll the oldschool way, use for old browsers----
//   console.log(evt.target.getBoundingClientRect());
//   console.log("current scroll x/y :", window.pageXOffset, window.pageYOffset);
//   const s1cords = section1.getBoundingClientRect();
//   console.log(s1cords);
//   window.scrollTo(
//     s1cords.left + window.pageXOffset,
//     s1cords.top + window.pageYOffset
//   );
//   window.scrollTo({
//     left: s1cords.left + window.pageXOffset,
//     top: s1cords.top + window.pageYOffset,
//     behavior: "smooth",
//   });
//---scroll into view: use in newer browsers----

//-----event listeners----

// h1.onmouseenter = function () {
//   alert("onmouseenter");
// };
// function alertH1() {
//   alert("mouseenter");
//   h1.removeEventListener("mouseenter", alertH1);
// }
// const h1 = document.querySelector("h1");
// h1.addEventListener("mouseenter", alertH1);

// // setTimeout(function () {
// //   h1.removeEventListener("mouseenter", alertH1);
// // }, 5000);

// function randomNum(min, max) {
//   return Math.floor(Math.random() * (max - min) + 1) + min;
// }
// function randomCol() {
//   return `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(
//     0,
//     255
//   )})`;
// }

// document.querySelector(".nav__link").addEventListener("click", function (evt) {
//   console.log("link", evt.target);
//   this.style.backgroundColor = randomCol();
//   evt.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function (evt) {
//   console.log("links", evt.target);
//   this.style.backgroundColor = randomCol();
//   evt.stopPropagation();
// });
// document.querySelector(".nav").addEventListener("click", function (evt) {
//   console.log("nav", evt.target);
//   this.style.backgroundColor = randomCol();
//   evt.stopPropagation();
// });
//----evt listener lec end-----
