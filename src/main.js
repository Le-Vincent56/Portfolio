import * as utils from "./utils.js"
import * as header from "./header.js"
import * as sliders from "./range-input.js"
import * as bgVideo from "./background-video.js"
import * as pSlideShow from "./project-slideshow.js"
import * as music from "./music.js"
import * as pOverlay from "./project-overlay.js"

let init = () => {
    // Init smooth links
    utils.initSmoothLinks();

    // Init buttons
    utils.initButtons();

    // Init sliders
    sliders.initSliders();

    // Init overlay
    pOverlay.initOverlay();

    // Init slideshow
    pSlideShow.initSlideShow();

    // Init music
    music.initTracks();

    // Assign Events
    window.addEventListener("load", () => {header.handleHeader(20)});
    window.addEventListener("scroll", () => {header.handleHeader(20)});

    // Start playing video
    bgVideo.changeVideoAfterInterval();
}

init();