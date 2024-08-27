
console.log("jss");
let currentSong = new Audio();
let songs;
let currentfolder;

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
            console.log(currentfolder);
            playMusic(e.querySelector(".white").innerHTML.trim());
        });
    });

    return songs;

}
const playMusic = (track, pause = false) => {
    currentSong.src = `/${currentfolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "svg/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function dynamicAlbums() {

    let a = await fetch(`http://127.0.0.1:3000/songs/playlist1/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardsContainer1 = document.querySelector(".cardsContainer1");
    Array.from(anchors).forEach(async e => {
        if (e.href.includes(`playlist1/playlist1.`)) {
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`http://127.0.0.1:3000/songs/playlist1/${folder}/info.json`);
            let response = await a.json();
            cardsContainer1.innerHTML = cardsContainer1.innerHTML + `         
                        <div data-folder="playlist1" class="card">
                            <img src="/songs/playlist1/${folder}/cover.jpeg" alt="pop alb">
                            <h2>${response.title}</h2>
                            <h3>
                                <a href="">${response.artist1},</a>
                                <a href="">${response.artist2},</a>
                                <a href="">${response.artist3}</a>
                            </h3>
                            <svg class="playbutton" width="100" height="100">
                                <circle cx="50" cy="50" r="20" fill="#169c46" />
                                <image xlink:href="images/play-button-arrowhead.png" x="44" y="25" width="13" height="50" />
                            </svg>
                        </div>`
        }
    })



    let b = await fetch(`http://127.0.0.1:3000/songs/playlist2`);
    let response2 = await b.text();
    let div2 = document.createElement("div");
    div2.innerHTML = response2;
    let anchors2 = div2.getElementsByTagName("a");
    let cardsContainer2 = document.querySelector(".cardsContainer2");
    Array.from(anchors2).forEach(async e => {
        if (e.href.includes(`playlist2/playlist2.`)) {
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`http://127.0.0.1:3000/songs/playlist2/${folder}/info.json`);
            let response = await a.json();
            cardsContainer2.innerHTML = cardsContainer2.innerHTML += `         
                        <div data-folder="playlist2" class="card">
                            <img src="/songs/playlist2/${folder}/cover.jpeg" alt="pop alb">
                            <h2>${response.title}</h2>
                            <h3>
                                <a href="">${response.artist1},</a>
                                <a href="">${response.artist2},</a>
                                <a href="">${response.artist3}</a>
                            </h3>
                            <svg class="playbutton" width="100" height="100">
                                <circle cx="50" cy="50" r="20" fill="#169c46" />
                                <image xlink:href="images/play-button-arrowhead.png" x="44" y="25" width="13" height="50" />
                            </svg>
                        </div>`
        }
    })


    let c = await fetch(`http://127.0.0.1:3000/songs/playlist3`);
    let response3 = await c.text();
    let div3 = document.createElement("div");
    div3.innerHTML = response3;
    let anchors3 = div3.getElementsByTagName("a");
    let cardsContainer3 = document.querySelector(".cardsContainer3");
    Array.from(anchors3).forEach(async e => {
        if (e.href.includes(`playlist3/playlist3.`)) {
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`http://127.0.0.1:3000/songs/playlist3/${folder}/info.json`);
            let response = await a.json();
            cardsContainer3.innerHTML = cardsContainer3.innerHTML += `         
                        <div data-folder="playlist3" class="card">
                            <img src="/songs/playlist3/${folder}/cover.jpeg" alt="pop alb">
                            <h2>${response.title}</h2>
                            <h3>
                                <a href="">${response.artist1},</a>
                                <a href="">${response.artist2},</a>
                                <a href="">${response.artist3}</a>
                            </h3>
                            <svg class="playbutton" width="100" height="100">
                                <circle cx="50" cy="50" r="20" fill="#169c46" />
                                <image xlink:href="images/play-button-arrowhead.png" x="44" y="25" width="13" height="50" />
                            </svg>
                        </div>`
        }
    })
    let d = await fetch(`http://127.0.0.1:3000/songs/playlist4`);
    let response4 = await d.text();
    let div4 = document.createElement("div");
    div4.innerHTML = response4;
    let anchors4 = div4.getElementsByTagName("a");
    let cardsContainer4 = document.querySelector(".cardsContainer4");
    Array.from(anchors4).forEach(async e => {
        if (e.href.includes(`playlist4/playlist4.`)) {
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`http://127.0.0.1:3000/songs/playlist4/${folder}/info.json`);
            let response = await a.json();
            cardsContainer3.innerHTML = cardsContainer3.innerHTML += `         
                        <div data-folder="playlist4" class="card">
                            <img src="/songs/playlist4/${folder}/cover.jpeg" alt="pop alb">
                            <h2>${response.title}</h2>
                            <h3>
                                <a href="">${response.artist1},</a>
                                <a href="">${response.artist2},</a>
                                <a href="">${response.artist3}</a>
                            </h3>
                            <svg class="playbutton" width="100" height="100">
                                <circle cx="50" cy="50" r="20" fill="#169c46" />
                                <image xlink:href="images/play-button-arrowhead.png" x="44" y="25" width="13" height="50" />
                            </svg>
                        </div>`
        }
    })


  
  
    Array.from(document.querySelector(".cardsContainer1").getElementsByClassName("card")).forEach(e => {
    
        e.addEventListener("click", async element => {
            await getSongs(`songs/${element.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
    })
    })
    Array.from(document.querySelector(".cardsContainer2").getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async element => {
            await getSongs(`songs/${element.currentTarget.dataset.folder}`)
            playMusic(songs[0]);
        })
    })
    Array.from(document.querySelector(".cardsContainer3").getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async element => {
            await getSongs(`songs/${element.currentTarget.dataset.folder}`)
            playMusic(songs[0]);
        })
    })
   


}


async function main() {
    await getSongs("songs/playlist2");
    playMusic(songs[0], true);

    await dynamicAlbums();

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
        let index = songs.indexOf(currentSong.src.split("/")[5]);
        if (index < songs.length) {
            playMusic(songs[index + 1])
        }

    })
   
    prev.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src.split("/")[5]);
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
    console.log(currentSong.src.split("/"));
    Array.from(document.querySelectorAll(".card")).forEach(e => {
        e.addEventListener("dblclick", element => {
            let data = element.currentTarget.firstElementChild.src.split("/").slice(-3, -1);
            
            window.location.href = `secondpage.html?data=${encodeURIComponent(data)}`
        });
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