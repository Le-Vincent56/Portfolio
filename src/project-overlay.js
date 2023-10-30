export {initOverlay}

/* ----- OVERLAY FUNCTIONS ----- */
let initOverlay = () => {
    const projectBoxes = document.querySelectorAll(".project-box");
    const writingBoxes = document.querySelectorAll(".writing-box");
    const overlay = document.querySelector(".overlay")
    const closeBtn = document.querySelector(".close-button");

    // Set overlays for each project box
    projectBoxes.forEach((box) => {
        const overlayBtn = document.querySelector(`#${box.id}-overlay`)

        // Set defaults to none
        overlay.style.display = "none";
        overlayBtn.style.display = "none";

        box.addEventListener("click", () => {
            // Show the overlay
            overlay.style.display = "block";
            overlayBtn.style.display = "block";
            overlay.style.overflowY = 'auto';
            document.body.classList.add("overlay-open")
        });

        closeBtn.addEventListener("click", () => {
            // Remove the overlay
            overlayBtn.style.display = "none";
        });
    });

    // Set overlays for each writing box
    writingBoxes.forEach((box) => {
        const overlayBtn = document.querySelector(`#${box.id}-overlay`)

        // Set defaults to none
        overlay.style.display = "none";
        overlayBtn.style.display = "none";

        box.addEventListener("click", () => {
            // Show the overlay
            overlay.style.display = "block";
            overlayBtn.style.display = "block";
            overlay.style.overflowY = 'auto';
            document.body.classList.add("overlay-open")
        });

        closeBtn.addEventListener("click", () => {
            // Remove the overlay
            overlayBtn.style.display = "none";
        });
    });
    
    // Set the closebtn event
    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
        overlay.style.overflowY = 'hidden';
        document.body.classList.remove("overlay-open")
    })
}