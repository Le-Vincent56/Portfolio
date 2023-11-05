export {initSlideShow, initInnerSlideShow, adjustHeight, adjustHeightInit}

/* ----- SLIDESHOW FUNCTIONS ----- */
// Outer Slides
const slideContainer = document.querySelector(".slideshow-container");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

// Inner slides
const innerSlideShowNav = document.querySelector(".inner-slideshow-nav");
const innerSlideContainer = document.querySelector(".inner-slideshow-container");
const innerSlides = document.querySelectorAll(".inner-slide");
let innerCurrentIndex = 0;

let adjustHeightInit = () => {
    const slideHeight = slides[0].offsetHeight;

    // Set the height of the container to match the current slide's height
    slideContainer.style.height = slideHeight + 'px';
}

let adjustHeight = () => {
    const slideHeight = slides[currentIndex].offsetHeight;

    // Special casae for the "Music" slide
    if(currentIndex == 1) {
        // Set the height of the container to match the inner slide's height
        slideContainer.style.height = (innerSlides[innerCurrentIndex].offsetHeight + innerSlideShowNav.offsetHeight) + 'px';
    } else {
        // Set the height of the container to match the current slide's height
        slideContainer.style.height = slideHeight + 'px';
    }
}

let adjustInnerHeight = () => {
    let innerSlideHeight = innerSlides[innerCurrentIndex].offsetHeight;

    innerSlideContainer.style.height = innerSlideHeight;
}

let showSlide = (index) => {
    adjustHeight();

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
    });
}

let initSlideShow = () => {
    const codeBtn = document.querySelector("#code-btn");
    const musicBtn = document.querySelector("#music-btn");
    const writingBtn = document.querySelector("#writing-btn");

    codeBtn.addEventListener('click', () => {
        currentIndex = 0
        showSlide(currentIndex);
    });
    
    musicBtn.addEventListener('click', () => {
        currentIndex = 1;
        showSlide(currentIndex);
    });
    
    writingBtn.addEventListener('click', () => {
        currentIndex = 2;
        showSlide(currentIndex);
    });

    window.addEventListener("resize", adjustHeight);

    showSlide(currentIndex);
}

let showInnerSlide = (index) => {
    adjustInnerHeight();

    innerSlides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${innerCurrentIndex * 100}%)`;
    });
}

let initInnerSlideShow = () => {
    const soundEffectsBtn = document.querySelector("#sound-effects-btn");
    const musicTracksBtn = document.querySelector("#tracks-btn");

    musicTracksBtn.addEventListener('click', () => {
        innerCurrentIndex = 0;
        showInnerSlide(innerCurrentIndex);
        adjustHeight();
    });

    soundEffectsBtn.addEventListener('click', () => {
        innerCurrentIndex = 1;
        showInnerSlide(innerCurrentIndex);
        adjustHeight();
    });

    showInnerSlide(innerCurrentIndex);
}