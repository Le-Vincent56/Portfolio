export {initTracks}

const tracks = document.querySelectorAll(".track");
const playButtons = document.querySelectorAll(".play-button");
const volumeIcons = document.querySelectorAll(".volume-icon");
const audioElements = document.querySelectorAll(".track-audio");
const volumeSliders = document.querySelectorAll(".volume-slider");
const progressBars = document.querySelectorAll(".progress")
const progressBarHolders = document.querySelectorAll(".progress-bar");
const dragHandles = document.querySelectorAll(".drag-handle");
const trackDurations = document.querySelectorAll(".track-duration");
let isDragging = false;

let initTracks = () => {
    tracks.forEach((track, index) => {
        const audio = audioElements[index];
        const playButton = playButtons[index];
        const volumeIcon = volumeIcons[index];
        const volumeSlider = volumeSliders[index];
        const progressBar = progressBars[index];
        const progressBarHolder = progressBarHolders[index];
        const dragHandle = dragHandles[index];
        const trackDuration = trackDurations[index];

        // Toggle volume slider visibility when clicking the speaker icon
        volumeIcon.addEventListener('click', (event) => {
            if(volumeSlider.classList.contains("hidden")) {
                volumeSlider.classList.remove("hidden");
                volumeSlider.classList.add("visible");
            } else {
                volumeSlider.classList.remove("visible");
                volumeSlider.classList.add("hidden");
            }
        });
    
        playButton.addEventListener('click', () => {
            stopOtherTracks(index);

            if(audio.paused) {
                audio.play();
                track.classList.add('playing');
                playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                audio.pause();
                track.classList.remove('playing');
                playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        });
    
        // Seek time when the progress bar is clicked
        progressBarHolder.addEventListener('click', (e) => {
            if(!isDragging) {
                const clickX = e.clientX - progressBarHolder.getBoundingClientRect().left;
                const progressBarWidth = progressBarHolder.clientWidth;
                const seekTime = (clickX / progressBarWidth) * audio.duration;
                audio.currentTime = seekTime;
            }
        });

        // Update the progress bar on audio time updates
        audio.addEventListener('timeupdate', () => {
            updateProgressBar(audio, progressBar, dragHandle, trackDuration);
        });


        // Update the progress bar initially and when the audio is loaded
        audio.addEventListener('loadedmetadata', () => {
            updateProgressBar(audio, progressBar, dragHandle, trackDuration);
        });

        dragHandle.addEventListener('mousedown', (e) => {
            let initialX = e.clientX;
            isDragging = true;
          
            // Prevent text selection during dragging
            e.preventDefault();
          
            // Calculate the initial position of the drag handle relative to the mouse cursor
            const initialDragOffset = initialX - dragHandle.getBoundingClientRect().left;
          
            // Function to update the drag handle position based on the mouse position
            function updateDragHandlePosition(mouseX) {
                const progressBarWidth = progressBarHolder.clientWidth;
                const dragHandleWidth = dragHandle.clientWidth;
                const newPosition = (mouseX - progressBarHolder.getBoundingClientRect().left - initialDragOffset) / progressBarWidth;
          
                if (newPosition >= 0 && newPosition <= 1) {
                    // Update the drag handle position
                    dragHandle.style.left = `${newPosition * 100}%`;
          
                    // Update the audio playback position
                    audio.currentTime = newPosition * audio.duration;
                }
            }
          
            // Update the drag handle position when the mouse moves
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    updateDragHandlePosition(e.clientX);
                }
            });
          
            // Stop dragging when the mouse button is released
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                }
            });
        });

        // Play/pause the audio when clicking on the progress bar
        progressBar.addEventListener('click', () => {
            stopOtherTracks(index);

            if (audio.paused) {
                audio.play();
                track.classList.add('playing');
                playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                audio.pause();
                track.classList.remove('playing');
                playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        });
    
        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;

            if(volumeSlider.value >= 0.67) {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            } else if(volumeSlider.value >= 0.33) {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
            } else if(volumeSlider.value > 0) {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
            } else if(volumeSlider.value <= 0) {
                volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            }
        });
    });
}

// Function to format time into minutes : seconds
let formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to update the progress bar's position
let updateProgressBar = (audio, progress, dragHandle, trackDuration) => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressWidth = (currentTime / duration) * 100;
    progress.style.width = progressWidth + '%';
    dragHandle.style.left = progressWidth + '%';

    trackDuration.textContent = formatTime(audio.currentTime);
}

// Stop other tracks besides the one at the given index
let stopOtherTracks = (index) => {
    tracks.forEach((track, i) => {
      if (i !== index) {
        const audio = audioElements[i];
        const playButton = playButtons[i];
        track.classList.remove('playing');
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
      }
    });
  }