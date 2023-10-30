export {initSlideShow}

/* ----- SLIDESHOW FUNCTIONS ----- */
const slideContainer = document.querySelector(".slideshow-container");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

let adjustHeight = () => {
    const slideHeight = slides[currentIndex].offsetHeight;
    
    // Set the height of the container to match the current slide's height
    slideContainer.style.height = slideHeight + 'px';
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