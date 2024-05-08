"use strict";

const header = document.querySelector(".header");
const landing = document.querySelector(".landing");
const navigation = document.querySelector(".navigation");
const about = document.querySelector(".about");
const headerBtn = document.querySelector(".header-button");
const project = document.querySelector(".project");
const projectBtn = document.querySelectorAll(".project-btn");
const hamMenu = document.querySelector(".ham-menu");
const obsCall = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};
const obsOption = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsCall, obsOption);

observer.observe(landing);

headerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  about.scrollIntoView({ behavior: "smooth" });
});

// //////////////////////////
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  navigation.classList.toggle("active");
});
