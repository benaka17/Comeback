const songs = [
    {
        path: "songs/Clairo - Sofia.mp3",
        title: "Sofia",
        artist: "Clairo",
        start: "0:16",
        end: "0:50"
    },
    {
        path: "songs/The Cure - Just Like Heaven.mp3",
        title: "Just Like Heaven",
        artist: "The Cure",
        start: "0:48",
        end: "1:16"
    },
    {
        path: "songs/Feel.mp3",
        title: "Feel",
        artist: "YUUL, Kyson",
        start: "1:13",
        end: "1:40"
    },
    {
        path: "songs/HML.mp3",
        title: "HML",
        artist: "Sisyfuss",
        start: "0:37",
        end: "1:37"
    },
    {
        path: "songs/I Could Die for You.mp3",
        title: "I Could Die for You",
        artist: "Red Hot Chili Peppers",
        start: "0:34",
        end: "1:10"
    },
    {
        path: "songs/Jeff Buckley - Lover, You Should've Come Over (Audio).mp3",
        title: "Lover, You Should've Come Over",
        artist: "Jeff Buckley",
        start: "4:12",
        end: "4:36"
    },
    {
        path: "songs/Mac DeMarco My Kind Of Woman.mp3",
        title: "My Kind Of Woman",
        artist: "Mac DeMarco",
        start: "0:00",
        end: "0:56"
    },
    {
        path: "songs/Movements - Skin To Skin (Official Music Video).mp3",
        title: "Skin To Skin",
        artist: "Movements",
        start: "0:38",
        end: "1:20"
    },
    {
        path: "songs/Nothing's Gonna Hurt You Baby - Cigarettes After Sex.mp3",
        title: "Nothing's Gonna Hurt You Baby",
        artist: "Cigarettes After Sex",
        start: "0:58",
        end: "1:39"
    },
    {
        path: "songs/The Bilinda Butchers - hai bby.mp3",
        title: "hai bby",
        artist: "The Bilinda Butchers",
        start: "0:45",
        end: "2:20"
    },
    {
        path: "songs/The Cure - Pictures Of You.mp3",
        title: "Pictures Of You",
        artist: "The Cure",
        start: "7:20",
        end: "7:56"
    },
    {
        path: "songs/Apocalypse - Cigarettes After Sex.mp3",
        title: "Apocalypse",
        artist: "Cigarettes After Sex",
        start: "2:23",
        end: "2:35"
    },
    {
        path: "songs/The Marias - Heavy (Official Audio).mp3",
        title: "Heavy",
        artist: "The Marias",
        start: "1:58",
        end: "2:19"
    },
    {
        path: "songs/Dark Paradise.mp3",
        title: "Dark Paradise",
        artist: "Lana Del Rey",
        start: "0:30",
        end: "1:19"
    },
    {
        path: "songs/No Vacation - Yam Yam.mp3",
        title: "Yam Yam",
        artist: "No Vacation",
        start: "0:42",
        end: "1:20"
    }
];


const audioPlayer = document.getElementById("audioPlayer");

const songTitle = document.getElementById("songTitle");
const artistTitle = document.getElementById("artistTitle");
const songTimestamp = document.getElementById("songTimestamp");

const vinyl = document.getElementById("vinyl");

const previousButton = document.getElementById("previousButton");
const pauseButton = document.getElementById("pauseButton");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");

const scrollDown = document.getElementById("scrollDown");

let currentSongIndex = 0;


// Convert "2:17" into seconds
function timestampToSeconds(timestamp) {
    const parts = timestamp.split(":");

    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);

    return minutes * 60 + seconds;
}


// Load a song
function loadSong(index) {
    const song = songs[index];

    songTitle.textContent = song.title;
    artistTitle.textContent = song.artist;
    songTimestamp.textContent = `${song.start} – ${song.end}`;

    audioPlayer.src = encodeURI(song.path);
    audioPlayer.load();

    audioPlayer.addEventListener("loadedmetadata", function setStartTime() {
        audioPlayer.currentTime = timestampToSeconds(song.start);

        audioPlayer.removeEventListener(
            "loadedmetadata",
            setStartTime
        );
    });
}


// Play
function playSong() {
    audioPlayer.play().catch(error => {
        console.error("Could not play song:", error);
    });
}


// Pause
function pauseSong() {
    audioPlayer.pause();
}


// Update play/pause button visibility
function updatePlayPauseButtons() {
    if (audioPlayer.paused) {
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    } else {
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    }
}


// Update vinyl animation
function updateVinylAnimation() {
    if (audioPlayer.paused) {
        vinyl.classList.remove("playing");
    } else {
        vinyl.classList.add("playing");
    }
}


// Next song
function nextSong() {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();
}


// Previous song
function previousSong() {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
}


// Stop at the end timestamp
audioPlayer.addEventListener("timeupdate", () => {
    const song = songs[currentSongIndex];

    const endTime = timestampToSeconds(song.end);
    const startTime = timestampToSeconds(song.start);

    if (audioPlayer.currentTime >= endTime) {
        audioPlayer.pause();
        audioPlayer.currentTime = startTime;
    }
});


// Audio starts playing
audioPlayer.addEventListener("play", () => {
    updatePlayPauseButtons();
    updateVinylAnimation();
});


// Audio pauses
audioPlayer.addEventListener("pause", () => {
    updatePlayPauseButtons();
    updateVinylAnimation();
});


// Audio loading error
audioPlayer.addEventListener("error", () => {
    console.error(
        "Could not load audio:",
        songs[currentSongIndex].path
    );

    console.error("Audio error:", audioPlayer.error);
});


// Buttons
playButton.addEventListener("click", playSong);
pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);


// Scroll down arrow
scrollDown.addEventListener("click", () => {
    document.getElementById("records").scrollIntoView({
        behavior: "smooth"
    });
});


// Initial state
loadSong(currentSongIndex);
updatePlayPauseButtons();
updateVinylAnimation();

// ===============================
// OUTRO
// ===============================

const outroButton = document.getElementById("playOutro");

const outroAudio = new Audio(
    "songs/girl in red - we fell in love in october.mp3"
);

const outroPlayPath =
    "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z";

const outroPausePath =
    "M15.75 5.25v13.5m-7.5-13.5v13.5";

const outroPath = outroButton.querySelector("path");


// Play / pause outro
outroButton.addEventListener("click", () => {

    if (outroAudio.paused) {

        // Pause the main record player if something is playing
        if (typeof audioPlayer !== "undefined" && !audioPlayer.paused) {
            audioPlayer.pause();
        }

        outroAudio.play()
            .then(() => {
                outroPath.setAttribute("d", outroPausePath);
            })
            .catch(error => {
                console.error("Could not play outro:", error);
            });

    } else {

        outroAudio.pause();

        outroPath.setAttribute("d", outroPlayPath);
    }

});


// When outro finishes, switch button back to play
outroAudio.addEventListener("ended", () => {

    outroPath.setAttribute("d", outroPlayPath);

});