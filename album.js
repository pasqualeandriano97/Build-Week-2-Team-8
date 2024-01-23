// GET
// Funzione per ottenere l'id dell'album dalla URL
const getAlbumIdFromUrl = function () {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const searchParams = url.searchParams; // paramatres di query dall'URL
  const albumId = searchParams.get("albumId");
  return albumId;
};

//FETCH:
// Funzione per effettuare la chiamata API e ottenere i dati dell'album
const fetchAlbumData = function (albumId) {
  // endpoint dell'API per ottenere i dati dell'album:
  const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/75621062`; // ${albumId}
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
      // fetchAlbumTracks(albumId); // ERROR:Chiamata per ottenere le tracce
    })

    .catch((error) => {
      console.error("Errore nella chiamata API:", error);
      throw error;
    });
};

// Funzione per ottenere tracce album:
// "https://api.deezer.com/album/75621062/tracks" ciclo  tracks
const fetchAlbumTracks = function (albumId) {
  const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}/tracks`;
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      return response.json();
    })
    .then((trackData) => {
      updateSongList(trackData.data); // Aggiorna la lista delle canzoni
      console.log(trackData);
    })
    .catch((error) => {
      console.error("Errore nella chiamata API delle tracce:", error);
      throw error;
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
  albumDescription.innerText = albumData.description;

  // immagine album:
  const albumImage = document.getElementById("album-image");
  albumImage.src = albumData.cover;
  albumImage.alt = albumData.title;

  // lista canzoni:
  const songList = document.getElementById("song-list");
  albumData.songs.forEach(function (song, index) {
    const songDiv = document.createElement("div");
    songDiv.classList.add("row", "align-items-center", "mt-2", "fw-bold");

    // numero di traccia:
    const trackNumber = document.createElement("div");
    trackNumber.classList.add("col");
    trackNumber.innerText = index + 1;
    songDiv.appendChild(trackNumber);

    // titolo canzone:
    const songTitle = document.createElement("div");
    songTitle.classList.add("col");
    songTitle.innerText = song.title;
    songDiv.appendChild(songTitle);

    // icon play:
    const playIcon = document.createElement("div");
    playIcon.classList.add("col", "text-center", "play-icon");
    playIcon.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    songDiv.appendChild(playIcon);

    playIcon.addEventListener("click", function () {
      console.log("Riproduzione della canzone:", song.title);
    });

    // RIPRODUZIONI:
    const songReproductions = document.createElement("div");
    songReproductions.classList.add("col", "text-center");
    songReproductions.innerText = song.reproductions;
    songDiv.appendChild(songReproductions);

    // DURATA:
    const songDuration = document.createElement("div");
    songDuration.classList.add("col", "text-end");
    songDuration.innerHTML = `<i class="bi bi-clock"></i> ${song.duration}`;
    songDiv.appendChild(songDuration);

    songList.appendChild(songDiv);
  });
};

// ID album dalla URL che prendo dalla window:
const albumId = getAlbumIdFromUrl();
fetchAlbumData(albumId)
  .then(updatePageWithAlbumData)
  .catch(function (error) {
    console.error("Errore nel recupero dei dati dell'album:", error);
  });
