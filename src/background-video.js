export {changeVideoAfterInterval}

/* ----- VIDEO FUNCTIONS ----- */
const videoSources = [
    "./media/videos/GoodLuckValley_Gameplay.mp4",
    "./media/videos/Shepherd_Gameplay.mp4",
    "./media/videos/Voror_Gameplay.mp4",
    "./media/videos/Soulbinder_Gameplay.mp4"
];
let video = document.querySelector("#background-video");
let currentVideoIndex = 0;

// Get a random time in the current video
let getRandomVideoTime = () => {
    // Generate a random time within the video duration (excluding the last 5 seconds)
    let maxTime = video.duration - 5;
    return Math.random() * maxTime;
}

// Play the current video
let playVideo = () => {
    // Get the next video
    video.src = videoSources[currentVideoIndex];
    video.play();
    video.addEventListener('loadedmetadata', () => {
        video.currentTime = getRandomVideoTime();
    });
}

// Change the video and play it, repeat every 10 seconds
let changeVideoAfterInterval = () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    playVideo(video);

    // Change the video after 10 seconds (adjust the time in milliseconds as needed)
    setTimeout(changeVideoAfterInterval, 10000);
}