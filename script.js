'use strict';
const loader = document.querySelector('.loader');
const entirePage = document.querySelector('.entire-page');
const header = document.querySelector('.header');
const landing = document.querySelector('.landing');
const navigation = document.querySelector('.navigation');
const about = document.querySelector('.about');
const headerBtn = document.querySelector('.header-button');
const project = document.querySelector('.project');
const projectBtn = document.querySelectorAll('.project-btn');
const hamMenu = document.querySelector('.ham-menu');
const obsCall = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};
const obsOption = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsCall, obsOption);

observer.observe(landing);

window.addEventListener('load', () => {
  loader.style.display = 'none';
  loader.style.visibility = 'hidden';
  entirePage.style.display = 'block';
  entirePage.style.visibility = 'visible';
});

headerBtn.addEventListener('click', e => {
  e.preventDefault();

  about.scrollIntoView({ behavior: 'smooth' });
});

// //////////////////////////
hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  navigation.classList.toggle('active');
});

// /////////////////////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// ///////////
//navigation operations
document.querySelector('.nav-links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    hamMenu.classList.toggle('active');
    navigation.classList.toggle('active');
  }
});

//////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
