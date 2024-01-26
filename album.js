// GET
// Funzione per ottenere l'id dell'album dalla URL
const getAlbumIdFromUrl = function () {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const searchParams = url.searchParams; // paramatres di query dall'URL
  const albumId = searchParams.get("singleAlbum");
  return albumId;
};
//////
const audioPlayer = new Audio();
let countsecond = 0;
let counter;

audioPlayer.addEventListener("ended", () => {
  const currentPlaying = document.querySelector(".playing");
  if (currentPlaying) {
    currentPlaying.classList.remove("playing");
  }
});
/////////
const bottomNav = document.getElementById("bottomNav"); ////
/////////
const playTrack = (previewUrl, songElement, trackInfo) => {
  // Trovo l'elemento attualmente in riproduzione e rimuovi la classe 'playing':
  const currentlyPlaying = document.querySelector(".playing");
  if (currentlyPlaying) {
    currentlyPlaying.classList.remove("playing");
  }

  // Aggiungo la classe 'playing' alla canzone corrente:
  songElement.classList.add("playing");

  // Imposta la sorgente audio e riproduci
  audioPlayer.src = previewUrl;
  audioPlayer.play();

  // Nasconde la barra di navigazione inferiore
  const bottomNav = document.getElementById("bottomNav");
  bottomNav.style.display = "none";

  // Aggiorna l'interfaccia utente del player
  updatePlayerUI(trackInfo);

  // Avvia il contatore della barra di progresso
  startCounter();
}; ////

// Funzione per aggiornare l'interfaccia utente del player
function updatePlayerUI(trackInfo) {
  const playerImg = document.getElementById("player-img");
  const titleSong = document.getElementById("title-song");

  playerImg.src = trackInfo.album.cover;
  titleSong.textContent = trackInfo.title;

  // Mostra il player
  document.getElementById("player").classList.remove("d-none");
}

// Funzione per avviare il contatore della barra di progresso
function startCounter() {
  stopCounter(); // Azzera e ferma il contatore esistente
  countsecond = 0;
  counter = setInterval(updateProgressBar, 1000);
  updateProgressBar();
}

// Funzione per aggiornare la barra di progresso
function updateProgressBar() {
  const progressBar = document.getElementById("bar");
  progressBar.style.width = countsecond + "%";
  countsecond += 3;
  if (countsecond > 95) {
    stopCounter();
  }
}

// Funzione per fermare il contatore della barra di progresso
function stopCounter() {
  clearInterval(counter);
  countsecond = 0;
  document.getElementById("bar").style.width = countsecond + "%";
}

// Event listener per il pulsante di pausa
document.getElementById("pause-player").addEventListener("click", () => {
  if (!audioPlayer.paused) {
    audioPlayer.pause();
    stopCounter();
  } else {
    audioPlayer.play();
    startCounter();
  }
});

// Event listener per il controllo del volume
document
  .getElementById("volume-slider")
  .addEventListener("input", function (e) {
    audioPlayer.volume = e.currentTarget.value / 100;
  });

// Funzione per aggiornare l'interfaccia utente del player
function updatePlayerUI(trackInfo) {
  const playerImg = document.getElementById("player-img");
  const titleSong = document.getElementById("title-song");
  const artistName = document.getElementById("artist-name");

  playerImg.src = trackInfo.album.cover;
  titleSong.textContent = trackInfo.title;
  artistName.textContent = trackInfo.artist.name; //
  // let rgb = getAverageRGB(playerImg); // ritorna l'rgb
  // document.body.style.backgroundColor =
  //  "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
  // console.log(rgb);

  // Mostra il player
  document.getElementById("player").classList.remove("d-none");
}

//FETCH:
// Funzione per effettuare la chiamata API e ottenere i dati dell'album
const fetchAlbumData = function (albumId) {
  // endpoint dell'API per ottenere i dati dell'album:
  const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`; //     2526238131  75621062 76311092
  return fetch(apiUrl) // fetch all'API
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      return response.json();
    })
    .then((dataAlbum) => {
      console.log(dataAlbum);
      updatePageWithAlbumData(dataAlbum);
      uptadeSongList(dataAlbum);
      // fetchAlbumTracks(albumId); // ERROR:Chiamata per ottenere le tracce
      console.log(dataAlbum.cover);
      trovaColoreMedioImmagine(dataAlbum.cover_medium, risultato);
      function risultato(coloreMedio) {
        document.getElementById("color").style.backgroundColor =
          "rgb(" +
          coloreMedio.r +
          "," +
          coloreMedio.g +
          "," +
          coloreMedio.b +
          ")";
        console.log(coloreMedio);
      }
    })
    .catch((error) => {
      console.error("Errore nella chiamata API:", error);
      throw error;
    });
};

function timing(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// per mettere i punti nei n delle riproduzioni
function applicaSeparatore2(importoNumerico) {
  var importo = importoNumerico.toString();
  if (importo.length > 3) {
    importo = importo
      .split("", importo.length)
      .reverse()
      .join("")
      .replace(/([0-9]{3})/g, "$1.");
    importo = importo
      .split("", importo.length - 1)
      .reverse()
      .join("");
  }
  return importo;
}

const uptadeSongList = function (tracce) {
  const songsListElement = document.getElementById("song-list");
  let i = 1;
  console.log(tracce.tracks);
  tracce.tracks.data.forEach(function (track) {
    console.log(track);
    const songDiv = document.createElement("div");
    songDiv.classList.add(
      "row",
      "align-items-center",
      "justify-content-between"
    );
    songDiv.innerHTML = `
        <div class="col"><span class="me-1">${i}</span>${track.title}
        <div class="song-artist">${track.artist.name}</div></div>
        <div class="col text-center hide-on-mobile" style="color: gray;">${applicaSeparatore2(
          track.rank
        )}</div>
        <div class="col text-end hide-on-mobile" style="color: gray;">
          <p>${timing(track.duration)}</p>
        </div>
        <div class="col-auto d-block d-md-none">
            <i class="bi bi-three-dots-vertical"></i>
          </div>
        `;
    //////
    songDiv.addEventListener("click", () => {
      playTrack(track.preview, songDiv, track);
    });
    //////
    i++;
    songsListElement.appendChild(songDiv);
  });
};
//

// Funzione per aggiornare la pagina con i dati dell'album ottenuti dall'API
const updatePageWithAlbumData = function (albumData) {
  // itera albumData(oggetto)
  console.log(albumData);
  // h1
  const albumTitle = document.getElementById("album-title");
  albumTitle.innerText = albumData.title;

  // p
  const albumDescription = document.getElementById("album-description");
  const artistName = albumData.artist.name;
  const releaseYear = new Date(albumData.release_date).getFullYear();
  const trackCount = albumData.nb_tracks;
  const totalDuration = timing(albumData.duration);
  //albumDescription.innerText = `${artistName} ${releaseYear} ${trackCount} brani, ${totalDuration}`;
  const artistImage = document.createElement("img");
  artistImage.src = albumData.artist.picture;
  artistImage.alt = artistName;

  // Creazione e stile per artistName
  const artistNameSpan = document.createElement("span");
  artistNameSpan.textContent = artistName;
  artistNameSpan.style.fontWeight = "bold";
  artistNameSpan.style.marginLeft = "5px";

  // Creazione e stile per totalDuration
  const totalDurationSpan = document.createElement("span");
  totalDurationSpan.textContent = ` ${totalDuration} sec.`;
  totalDurationSpan.style.color = "grey";
  /////
  artistImage.style.width = "50px";
  artistImage.style.height = "50px";
  artistImage.style.borderRadius = "50%";

  // Aggiungo l'immagine dell'artista prima del testo nel paragrafo
  albumDescription.insertBefore(artistImage, albumDescription.firstChild);

  // Aggiungo il testo relativo alle informazioni dell'album
  albumDescription.appendChild(artistNameSpan); // dubbi
  albumDescription.insertAdjacentText(
    "beforeend",
    `  • ${releaseYear} • ${trackCount} brani, ` // ${artistName} ${totalDuration} sec.
  );
  albumDescription.appendChild(totalDurationSpan); // dubbi
  // immagine album:
  const albumImage = document.getElementById("album-image");
  albumImage.src = albumData.cover;
  // draw(albumData.cover); //
  albumImage.alt = albumData.title;
};

// Chiamata API per ottenere i dati dell'album
const albumId = getAlbumIdFromUrl();
fetchAlbumData(albumId)
  .then((albumData) => {
    updatePageWithAlbumData(albumData);
    uptadeSongList(albumData);
    ///////
    // Aggiungi l'ascoltatore di eventi al pulsante di play
    const playButton = document.querySelector(".bi-play-circle-fill");
    if (playButton) {
      playButton.addEventListener("click", () => {
        const firstTrackPreviewUrl = albumData.tracks.data[0].preview;
        playTrack(firstTrackPreviewUrl);
      });
    }
  })
  //////
  .catch(function (error) {
    console.error("Errore nel recupero dei dati dell'album:", error);
  });

// Aggiunta del codice per la funzionalità dello shuffle
const shuffleIcon = document.querySelector(".bi-shuffle");

if (shuffleIcon) {
  shuffleIcon.addEventListener("click", function () {
    this.classList.toggle("shuffle-active");
  });
}

////////////Inizio
/*function getAverageRGB(imgEl) {
  let blockSize = 5,
    defaultRGB = { r: 0, g: 0, b: 0 },
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = rgb.r / count;
  rgb.g = rgb.g / count;
  rgb.b = rgb.b / count;

  return rgb;
}*/

function trovaColoreMedioImmagine(urlImmagine, callback) {
  var img = new Image();
  img.crossOrigin = "Anonymous"; // Per evitare problemi di sicurezza con l'accesso ai pixel di immagini da altri domini
  img.src = urlImmagine;

  img.onload = function () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    // Imposta la dimensione del canvas sulla dimensione dell'immagine
    canvas.width = img.width;
    canvas.height = img.height;

    // Disegna l'immagine sul canvas
    context.drawImage(img, 0, 0, img.width, img.height);

    // Ottieni i dati dei pixel
    var imageData = context.getImageData(0, 0, img.width, img.height);
    var data = imageData.data;

    // Variabili per la somma dei colori
    var sumRed = 0;
    var sumGreen = 0;
    var sumBlue = 0;

    // Calcola la somma dei colori
    for (var i = 0; i < data.length; i += 4) {
      sumRed += data[i];
      sumGreen += data[i + 1];
      sumBlue += data[i + 2];
    }

    // Calcola la media dei colori
    var numPixels = data.length / 4;
    var avgRed = sumRed / numPixels;
    var avgGreen = sumGreen / numPixels;
    var avgBlue = sumBlue / numPixels;

    // Restituisci il colore medio come oggetto {r, g, b}
    var coloreMedio = {
      r: Math.round(avgRed),
      g: Math.round(avgGreen),
      b: Math.round(avgBlue),
    };

    // Chiama la callback con il colore medio
    callback(coloreMedio);
  };
}
