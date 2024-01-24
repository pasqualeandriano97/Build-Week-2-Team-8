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
      uptadeSongList(dataAlbum);
      // fetchAlbumTracks(albumId); // ERROR:Chiamata per ottenere le tracce
    })

    .catch((error) => {
      console.error("Errore nella chiamata API:", error);
      throw error;
    });
};

// formattare durata
function timing(duration) {
  const slots = [];
  duration = Math.ceil(duration);
  while (duration > 59 && slots.length < 2) {
    slots.push((duration % 60).toString().padStart(2, "0"));
    duration = Math.floor(duration / 60);
  }
  if (duration > 0) slots.push(duration);
  return slots.reverse().join(":");
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
    <div class="col"><span class="me-1">${i}</span>${track.title}</div>
    <div class="col text-center">${applicaSeparatore2(track.rank)}</div>
    <div class="col text-end">
      <p>${timing(track.duration)}</p>
    </div>
    `;
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
  albumDescription.innerText = albumData.description;

  // immagine album:
  const albumImage = document.getElementById("album-image");
  albumImage.src = albumData.cover;
  albumImage.alt = albumData.title;
};

// ID album dalla URL che prendo dalla window:
const albumId = getAlbumIdFromUrl();
fetchAlbumData(albumId)
  .then(updatePageWithAlbumData)
  .catch(function (error) {
    console.error("Errore nel recupero dei dati dell'album:", error);
  });
