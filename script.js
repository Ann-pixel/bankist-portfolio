"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const sections = document.querySelectorAll(".section");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const navLinks = document.querySelector(".nav__links");

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab--container");
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
navLinks.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("nav__link")) {
    const id = evt.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
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
