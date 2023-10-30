export {handleHeader}

/* ----- HEADER FUNCTIONS ----- */
// Have a dynamic header that moves the nav-bar up into the header on scroll and the heading text to the left
let handleHeader = (height = 0) => {
    const scrollY = window.scrollY;
    const navigation = document.querySelector(".navigation");
    const header = document.querySelector(".header");
    const headerNav = document.querySelector(".header-nav");

    if(height == 0) {
        height = header.offsetHeight;
    }

    // Calculate the scroll position at which the links should become visible
    const scrollThreshold = height / 2;

    if (scrollY > height) {
        navigation.style.top = "0"; // Bring the navigation menu down
        header.classList.add("scrolled");
        header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
        headerNav.classList.remove("invisible");
    } else {
        header.classList.remove("scrolled");
        navigation.style.top = `${header.offsetHeight - scrollY - 1}px`; // Hide the navigation menu by adjusting top
        header.style.boxShadow = "none";
        headerNav.classList.add("invisible");
    }
}