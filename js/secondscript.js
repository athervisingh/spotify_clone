
console.log("jss");
let currentSong = new Audio();
let songs;
let currentfolder;
let url;
const playMusic = (track, pause = false) => {
    currentSong.src = `/${currentfolder}/` + track;
    
    if (!pause) {
        currentSong.play();
        play.src = "svg/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

function adjustOpacity(color, opacity) {
    // Parse the color string to extract its components
    var match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);

    // Extract RGB components
    var r = parseInt(match[1], 10);
    var g = parseInt(match[2], 10);
    var b = parseInt(match[3], 10);

    // Use the provided opacity, or default to 1 (fully opaque)
    var a = opacity !== undefined ? opacity : 1;

    // Return the modified color in rgba format
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

function getRandomRGBColor() {
    let red, green, blue;

    do {
        // Generate random values for red, green, and blue (each between 0 and 255)
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
    } while ((red === 0 && green === 0 && blue === 0) || (red === 255 && green === 255 && blue === 255));

    // Return the color in the RGB format
    return `rgb(${red}, ${green}, ${blue})`;
}

function convertSecondsToMinutes(inputSeconds) {
    // Ensure the input is an integer (round down to the nearest whole number)
    const seconds = Math.floor(inputSeconds);

    // Calculate the number of minutes
    const minutes = Math.floor(seconds / 60);

    // Calculate the remaining seconds
    const remainingSeconds = seconds % 60;

    // Format the minutes and seconds to always have two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return the formatted string
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currentfolder = folder;

    let songData = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await songData.text();


    let div = document.createElement("div");

    div.innerHTML = response;

    let a = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songul.innerHTML = "";
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
         
                            <img src="svg/music-svgrepo-com.svg" class="invert" alt="">
                            <div>
                                <div class="white"> ${song.replaceAll("%20", " ")}</div>
                                <div>Artist</div>
                            </div>
                            <img class="imgplay invert" src="svg/play-button-svgrepo-com.svg" alt="">
       </li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.querySelector(".imgplay").addEventListener("click", element => {

            currentfolder = `songs/${url[0]}`;
          
            playMusic(e.querySelector(".white").innerHTML.trim().replaceAll("%20", " "));
          
          
        });
    });

}

async function getSubSongs(folder) {
    currentfolder = folder;

    let songData = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await songData.text();


    let div = document.createElement("div");

    div.innerHTML = response;

    let a = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    let songul = document.querySelector(".songlist1").getElementsByTagName("ul")[0];
    songul.innerHTML = "";
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
         
                            <img src="svg/music-svgrepo-com.svg" class="invert" alt="">
                            <div>
                                <div class="white"> ${song.replaceAll("%E2%80%99S", " ").replaceAll("%20"," ")}</div>
                                <div>Artist</div>
                            </div>
                            <img class="imgplay invert" src="svg/play-button-svgrepo-com.svg" alt="">
       </li>`;
    }
    Array.from(document.querySelector(".songlist1").getElementsByTagName("li")).forEach(e => {
        e.querySelector(".imgplay").addEventListener("click", element => {
            currentfolder = `songs/${url[0]}/${url[1]}`;
            playMusic(e.querySelector(".white").innerHTML.trim());
        });
    });

}




async function dynamicphoto(url) {
    let a = await fetch(`http://127.0.0.1:3000/songs/${url[0]}/${url[1]}/info.json`);
    let response = await a.json();
    let randomcolor = getRandomRGBColor();
    document.querySelector(".showImageContainer").style.backgroundColor = randomcolor;
    let color1 = adjustOpacity(randomcolor,0.8)
    let color2 = "rgba(0, 0, 0, 0.429)";
    let color3 = "rgb(0,0,0)";
    const gradient = `linear-gradient(to bottom ,${color1}, ${color2},${color3})`;
    document.querySelector(".belowSongsContainer").style.background = gradient;
    let showimage = document.querySelector(".showImageContainer");
    showimage.innerHTML = "";
    showimage.innerHTML = showimage.innerHTML + `<img src="songs/${url[0]}/${url[1]}/cover.jpeg" alt="">
                <div class="info">
                    <h1>Album</h1>
                    <h2>${response.title}</h2>
                </div>`;
    
}



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function main() {


    url = getQueryParam('data').split(",");
    await getSongs(`songs/${url[0]}`);
    playMusic(songs[0], true);
    await getSubSongs(`songs/${url[0]}/${url[1]}`);
    await dynamicphoto(url);
    
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "svg/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "svg/play-button-svgrepo-com.svg";
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)} / ${convertSecondsToMinutes(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })
    document.querySelector(".humburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%";
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })
    
    next.addEventListener("click", () => {
        currentSong.pause();
        currentfolder = `songs/${url[0]}/${url[1]}`;
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index < songs.length) {
            playMusic(songs[index + 1])
        }

    })
    prev.addEventListener("click", () => {
        currentSong.pause();
        currentfolder = `songs/${url[0]}/${url[1]}`;
        let index = songs.indexOf(currentSong.src.split("/").slice("-1")[0]);
        if (index >= 0) {
            playMusic(songs[index - 1])
        }

    })

    document.querySelector(".vol").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".vol>img").src = document.querySelector(".vol>img").src.replace("mute.svg", "volume.svg");
        }
    })

    document.querySelector(".vol>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".vol").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.10;
            document.querySelector(".vol").getElementsByTagName("input")[0].value = 10;
        }
    })


}
main();  