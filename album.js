// Funzione per ottenere l'id dell'album dalla URL
const getAlbumIdFromUrl = function () {
  // Implementazione della tua logica per ottenere l'id dell'album
};

// Funzione per effettuare la chiamata API e ottenere i dati dell'album
const fetchAlbumData = function (albumId) {
  // Utilizza l'endpoint dell'API per ottenere i dati dell'album
  const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

  //  fetch all'API
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }

      // Parse della risposta JSON
      return response.json();
    })
    .catch((error) => {
      console.error("Errore nella chiamata API:", error);
      throw error; // Rilancia l'errore per gestirlo nella catena di promesse
    });
};

// Funzione per aggiornare la pagina con i dati dell'album ottenuti dall'API
const updatePageWithAlbumData = function (albumData) {
  // H1 con il titolo dell'album
  const albumTitle = document.getElementById("album-title");
  albumTitle.innerText = albumData.title;

  // p con la descrizione dell'album
  const albumDescription = document.getElementById("album-description");
  albumDescription.innerText = albumData.description;

  //  l'img dell'album
  const albumImage = document.getElementById("album-image");
  albumImage.src = albumData.cover;
  albumImage.alt = albumData.title;

  // lista delle canzoni
  const songList = document.getElementById("song-list");
  albumData.songs.forEach(function (song, index) {
    // Crea un elemento div per ogni canzone
    const songDiv = document.createElement("div");
    songDiv.classList.add("row", "align-items-center", "mt-2", "fw-bold");

    //  numero di traccia
    const trackNumber = document.createElement("div");
    trackNumber.classList.add("col");
    trackNumber.innerText = index + 1;
    songDiv.appendChild(trackNumber);

    //  titolo della canzone
    const songTitle = document.createElement("div");
    songTitle.classList.add("col");
    songTitle.innerText = song.title;
    songDiv.appendChild(songTitle);

    /*// Aggiungi l'icona Play
    const playIcon = document.createElement("div");
    playIcon.classList.add("col", "text-center");
    playIcon.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    songDiv.appendChild(playIcon);*/

    // durata della canzone
    const songDuration = document.createElement("div");
    songDuration.classList.add("col", "text-end");
    songDuration.innerHTML = `<i class="bi bi-clock"></i> ${song.duration}`;
    songDiv.appendChild(songDuration);

    //  div della canzone alla lista
    songList.appendChild(songDiv);
  });
};

// id dell'album dalla URL
const albumId = getAlbumIdFromUrl();

//  API
fetchAlbumData(albumId)
  .then(updatePageWithAlbumData)
  .catch(function (error) {
    console.error("Errore nel recupero dei dati dell'album:", error);
  });
