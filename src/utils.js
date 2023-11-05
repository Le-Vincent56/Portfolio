export {initSmoothLinks, initButtons}

/* ----- SMOOTH LINKS ----- */
let initSmoothLinks = () => {
    // Apply smooth links
    let header = document.querySelector(".header");
    let navigation = document.querySelector(".navigation");

    // Select all links within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Add an event for each anchor for when they are clicked
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the id of the element and select it
            const targetElement = document.querySelector(this.getAttribute('href'));

            // Add the smooth scrolling behavior
            if (targetElement) {
                window.scrollTo({
                    // Calculate the top of the link and set the behavior to smooth
                    top: targetElement.offsetTop - header.offsetHeight + (navigation.offsetHeight/4),
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---- SELECTED SLIDESHOW BUTTONS ----- */
let initButtons = () => {
    // Select all buttons
    const outerButtons = document.querySelectorAll(".slideshow-btn");
    const innerButtons = document.querySelectorAll(".inner-slideshow-btn");

    // For each button add a click event
    outerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Select all buttons and removed selected
            const buttonsList = document.querySelectorAll(".slideshow-btn");
            buttonsList.forEach((buttonInList) => {
                buttonInList.classList.remove("selected");
            })

            // Add selected to the current button
            button.classList.add("selected");
        });
    });

    // For each button add a click event
    innerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Select all buttons and removed selected
            const buttonsList = document.querySelectorAll(".inner-slideshow-btn");
            buttonsList.forEach((buttonInList) => {
                buttonInList.classList.remove("selected");
            })

            // Add selected to the current button
            button.classList.add("selected");
        });
    });
}








