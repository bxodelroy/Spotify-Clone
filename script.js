//updated for GitHub
console.log("hello");



let songs = [
    "https://upcdn.io/223k2TX/raw/A%20Doin%20Time%20-%20Lana%20Del%20Rey.mp3",
    "https://upcdn.io/223k2TX/raw/B%20Woh.mp3",
    "https://upcdn.io/223k2TX/raw/C%20Don't%20Cry%20%20-%20Guns%20N'%20Roses.mp3",
    "https://upcdn.io/223k2TX/raw/D%20Tu%20Mera%20-%20Baibhab%20Roy.mp3",
    "https://upcdn.io/223k2TX/raw/E%20So%20far%20away%20-%20Avenged%20Sevenfold.mp3",
    "https://upcdn.io/223k2TX/raw/F%20Tum%20Ho%20Rockstar%20128%20Kbps.mp3",
    "https://upcdn.io/223k2TX/raw/G%20Nirvana-Come-As-You-Are-_Official-Music-Video_.mp3",
    "https://upcdn.io/223k2TX/raw/H%20Yeh%20Fitoor%20Mera%20-%20Fitoor%20128%20Kbps.mp3",
    "https://upcdn.io/223k2TX/raw/I%20Billie%20Jean%20Michael%20Jackson%20128%20Kbps.mp3",
    "https://upcdn.io/223k2TX/raw/J-%20Lady_Gaga_-_Shallow_feat_Bradley_Cooper_(mp3.pm).mp3",
    "https://upcdn.io/223k2TX/raw/K-%20The%20Unforgiven%20(Remastered).mp3",
    "https://upcdn.io/223k2TX/raw/L-%20The%20Emptiness%20Machine.mp3",
    "https://upcdn.io/223k2TX/raw/M-%20Beggin.mp3",
    "https://upcdn.io/223k2TX/raw/N-%20High%20On%20You%20Jind%20Universe.mp3",
    "https://upcdn.io/223k2TX/raw/O%20-%20Chaandni.mp3",
    "https://upcdn.io/223k2TX/raw/P-%20Sukoon%20%20Arijit-Singh.mp3",
    "https://upcdn.io/223k2TX/raw/Q-%20For-A-Reason.mp3",
    "https://upcdn.io/223k2TX/raw/R%20-%20Derek%20And%20The%20Dominos%20-%20Layla.mp3",
    "https://upcdn.io/223k2TX/raw/S-%20BLACK%20SABBATH%20-%20Paranoid.mp3",
    "https://upcdn.io/223k2TX/raw/T-%2021%20guns%20-Green-Day.mp3",
    "https://upcdn.io/223k2TX/raw/U-%20Ghost_-_Spillways.mp3",
    "https://upcdn.io/223k2TX/raw/V-%20Dhun%20Saiyaara.mp3",
    "https://upcdn.io/223k2TX/raw/W-%20Lana_Del_Rey_-_Say_Yes_To_Heaven_CeeNaija.com_.mp3",
    "https://upcdn.io/223k2TX/raw/X-%20Lana_Del_Rey_-_Young_And_Beautiful.mp3",
    "https://upcdn.io/223k2TX/raw/Y-%20Late%20Guests%20-%20Ansh.mp3",
    "https://upcdn.io/223k2TX/raw/ZA-%20The_Weeknd_-_The_Abyss_2025_(SkySound.cc).mp3",
    "https://upcdn.io/223k2TX/raw/ZB-%20Bang%20BangVishal%20Shekhar%2CBenny%2CNeeti.mp3",
    "https://upcdn.io/223k2TX/raw/Zc-%20Mehndi%20Laga%20Ke%20Rakhna%20Dilwale%20Dulhania%20Le%20Jayenge%20128%20Kbps.mp3",
    "https://upcdn.io/223k2TX/raw/ZD-%20Dil%20Kaa%20Jo%20Haal%20Hai%20Besharam%20128%20Kbps.mp3"
];

let playerBox = document.querySelector(".player-box");
let pause = document.querySelector(".pause");
let play = document.querySelector("#play");
let songPlay = document.querySelector(".play");
let topPlay = document.querySelectorAll(".top-play");
let audio = null;
let currentSongIndex = -1;
let displayName = document.querySelector(".display-name");
let autoPlay = document.querySelector(".auto-play");
let isAutoPlay = false;
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let vol = document.querySelector(".range").getElementsByTagName("input")[0];
vol.value = 50;


function formatDuration(duration) {
    // Round down the total seconds to the nearest integer
    const totalSeconds = Math.floor(duration);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Add leading zero to seconds if needed
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Return formatted time (e.g. "0:04")
    return `${minutes}:${formattedSeconds}`;
}


function playSong(index, btn = null) {
    // Stop any currently playing song
    if (audio) audio.pause();

    currentSongIndex = index;
    audio = new Audio(songs[currentSongIndex]);
    audio.volume = vol.value / 100;
    audio.play();

    // ✅ Detect play/pause from external controls (earphones, system buttons, etc.)
    audio.addEventListener("play", () => {
        play.classList.add("hide-no-mouse");
        pause.classList.remove("hide-no-mouse");
    });

    audio.addEventListener("pause", () => {
        play.classList.remove("hide-no-mouse");
        pause.classList.add("hide-no-mouse");
    });

    audio.addEventListener("loadedmetadata", () => {
        document.querySelector(".totaltime").innerHTML = `${formatDuration(audio.duration)}`;
    });


    audio.addEventListener("timeupdate", () => {
        // console.log(audio.currentTime , audio.duration);
        document.querySelector(".songtime").innerHTML = `${formatDuration(audio.currentTime)}`;
        if (!isNaN(audio.duration)) {
            document.querySelector(".totaltime").innerHTML = ` ${formatDuration(audio.duration)}`;
        }
        document.querySelector(".play-circle").style.left = (audio.currentTime / audio.duration) * 100 + "%";

    });

    // UI updates
    playerBox.style.bottom = "0";
    document.querySelectorAll(".card").forEach(c => c.classList.remove("hover-color"));
    let card = Array.from(document.querySelectorAll(".card")).find(c => {
        let btn = c.querySelector(".play-button");
        return songs[index] === songs[btn.dataset.song];
    });


    // Log the song name or show it somewhere
    if (card) {
        let songNameElement = card.querySelector(".song"); // get the <p class="song">
        let singerNameElement = card.querySelector(".name");
        let songName = `${songNameElement.innerText.trim()} - ${singerNameElement.innerText.trim()}`;   // extract the song name text
        displayName.innerHTML = songName;
        card.classList.add("hover-color");
        console.log("Now playing:", songName);
    }





    // Auto play next when current ends
    audio.addEventListener("ended", () => {
        if (isAutoPlay) {
            if (currentSongIndex < songs.length - 1) {
                playSong(currentSongIndex + 1);
            } else {
                playSong(0);
            }
        } else {
            play.classList.remove("hide-no-mouse");
            pause.classList.add("hide-no-mouse");
        }
    });


}
autoPlay.addEventListener("click", () => {
    isAutoPlay = !isAutoPlay;
    autoPlay.classList.toggle("active", isAutoPlay);
    autoPlay.innerHTML = `<i class="fa-solid fa-repeat" style="color: #000000;"></i> <span class="auto-text">${isAutoPlay ? "ON" : "OFF"}</span>`;
});



/*async function getSongs() {
    //let a = await fetch("http://127.0.0.1:5500/songs/");
    //let a = await fetch("https://bxodelroy.github.io/Spotify-Clone/songs/");
    //let a = await fetch("https://bxodelroy.github.io/Spotify-Clone/songs/index.html");
    //let a = await fetch("https://bxodelroy.github.io/Spotify-Clone/");
    let a = await fetch("https://bxodelroy.github.io/Spotify-Clone/songs/");




    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");


    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    

    return songs
}*/






async function main() {
    //songs = await getSongs(); // Use the fetched list directly
    //console.log(songs);

    let playBtn = document.querySelectorAll(".play-button");
    playBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = Number(btn.dataset.song);
            playSong(index, btn);
            playerBox.style.bottom = "0";
            play.classList.add("hide-no-mouse");
            pause.classList.remove("hide-no-mouse");
        });
    });
}


main();
pause.addEventListener('click', () => {
    if (audio) {
        audio.pause();
    }
    play.classList.remove('hide-no-mouse');
    pause.classList.add('hide-no-mouse');
});


play.addEventListener('click', () => {
    if (audio) {
        audio.play();
    }
    play.classList.add('hide-no-mouse');
    pause.classList.remove('hide-no-mouse');
});


// making next and previous
next.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
        playSong(currentSongIndex + 1);  // ✅ This updates audio + UI + name
    } else {
        playSong(0); // ✅ Loop back to first song if at end
    }
});

previous.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);  // ✅ This updates audio + UI + name
    } else {
        playSong(songs.length - 1);
    }
});


document.querySelector(".seekbar").addEventListener('click', e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".play-circle").style.left = percent + "%";
    audio.currentTime = (audio.duration * percent) / 100;
})

let left = document.querySelector(".left");
let leftBar = document.querySelector(".left-bar");
let cross = document.querySelector(".cross");
let find = document.querySelector(".create");
let toHide = document.querySelector(".to-be-hide");


leftBar.addEventListener("click", () => {
    left.style.left = "6" + "%";
    left.style.position = "fixed";
    leftBar.querySelector("i").style.color = "#1DB954";
    cross.classList.remove("hidden");
    find.addEventListener("click", () => {
        cross.classList.add("hidden");
        leftBar.querySelector("i").style.color = "#FFFFFF";
        left.style.left = "-100" + "%";
        
    })
});

cross.addEventListener("click", () => {
    cross.classList.add("hidden");
    leftBar.querySelector("i").style.color = "#FFFFFF";
    left.style.left = "-100" + "%";
});

let podcast = document.querySelector(".podcast"); 
podcast.addEventListener("click", ()=>{
    window.open("https://open.spotify.com/genre/0JQ5DArNBzkmxXHCqFLx2J", "_blank");
})



let volumeOn = document.querySelector(".volume-on");
let volumeMute = document.querySelector("#volume-mute");
vol.addEventListener("change", (e) => {
    volumeMute.classList.add("hide-no-mouse");
    volumeOn.classList.remove("hide-no-mouse");
    if (audio) {
        console.log(e.target.value);
        audio.volume = e.target.value / 100;
    }
});

volumeOn.addEventListener("click", () => {
    audio.volume = 0;
    volumeMute.classList.remove("hide-no-mouse");
    volumeOn.classList.add("hide-no-mouse");
});

volumeMute.addEventListener("click", () => {
    audio.volume = vol.value / 100;
    volumeMute.classList.add("hide-no-mouse");
    volumeOn.classList.remove("hide-no-mouse");
});

function updateVolumeBar() {
    let value = vol.value;
    vol.style.background = `linear-gradient(to right, #1DB954 ${value}%, #ddd ${value}%)`;
}

// Update while sliding
vol.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
    updateVolumeBar();
});

// Initial call on page load:
updateVolumeBar();





let rightPlaylist = document.querySelector(".right-playlist");
let right = document.querySelector(".right");
let home = document.querySelector(".home-logo");
find.addEventListener("click", () => {
    toHide.classList.add("hide-no-mouse");
    if(audio){
        playerBox.style.bottom = "0";
    }
    rightPlaylist.classList.remove("hidden-display");
    toHide.style.display = "none";
    right.style.width = "0px";

    home.addEventListener("click", () => {
        toHide.classList.remove("hide-no-mouse");
        rightPlaylist.classList.add("hidden-display");
        right.style.width = "";
        toHide.style.display = "block";
    })
});

const playlistButtons = document.querySelectorAll(".playlist-button");

playlistButtons.forEach(button => {
    button.addEventListener("click", () => {
        const appLink = button.getAttribute("data-app");
        const webLink = button.getAttribute("data-web");

        //safety check to prevent /null
        if (!appLink || !webLink) {
            console.error("Missing data-app or data-web for:", button);
            return;
        }
        console.log("Clicked:", appLink, webLink);


        // Try opening in app
        window.location = appLink;

        // Fallback to web after short delay
        setTimeout(() => {
            window.open(webLink, "_blank");
        }, 600);
    });
});



