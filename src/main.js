import * as utils from "./utils.js"
import * as header from "./header.js"
import * as sliders from "./range-input.js"
import * as bgVideo from "./background-video.js"
import * as pSlideShow from "./project-slideshow.js"
import * as music from "./music.js"
import * as pOverlay from "./project-overlay.js"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let init = () => {
    setupEffects();

    // Init smooth links
    utils.initSmoothLinks();

    // Init buttons
    utils.initButtons();

    // Init sliders
    sliders.initSliders();

    // Init overlay
    pOverlay.initOverlay();

    // Init slideshows
    pSlideShow.initSlideShow();
    pSlideShow.initInnerSlideShow();
    pSlideShow.adjustHeight();

    // Init music
    music.initTracks();

    // Assign Events
    window.addEventListener("load", () => {header.handleHeader(20)});
    window.addEventListener("scroll", () => {header.handleHeader(20)});

    // Start playing video
    bgVideo.changeVideoAfterInterval();

    // Make sure the slideshow container height is fully initialized
    pSlideShow.adjustHeightInit();
}

let setupEffects = () => {
    // "Hacked" effect
    let hackables = document.querySelectorAll(".hackable")
    console.log(hackables);
    for(const hackable of hackables) {
        hackable.onmouseover = e => {
            let iterations = 0;

            // Show the "hacker" effect
            const interval = setInterval(() => {
                e.target.innerText = e.target.innerText.split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return e.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            // only run 10 times
            if(iterations >= e.target.dataset.value.length) {
                clearInterval(interval);
            }

            // Increment
            iterations += 1 / 3;
            }, 25);
        };
    }
}

init();