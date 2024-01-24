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
/*function timing(duration) {
  const slots = [];
  duration = Math.ceil(duration);
  while (duration > 59 && slots.length < 2) {
    slots.push((duration % 60).toString().padStart(2, "0"));
    duration = Math.floor(duration / 60);
  }
  if (duration > 0) slots.push(duration);
  return slots.reverse().join(":");
}*/
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
    <div class="col text-center hide-on-mobile">${applicaSeparatore2(
      track.rank
    )}</div>
    <div class="col text-end hide-on-mobile">
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
  const artistName = albumData.artist.name;
  const releaseYear = new Date(albumData.release_date).getFullYear();
  const trackCount = albumData.nb_tracks;
  const totalDuration = timing(albumData.duration);
  //albumDescription.innerText = `${artistName} ${releaseYear} ${trackCount} brani, ${totalDuration}`;
  const artistImage = document.createElement("img");
  artistImage.src = albumData.artist.picture;
  artistImage.alt = artistName;

  artistImage.style.width = "50px";
  artistImage.style.height = "50px";
  artistImage.style.borderRadius = "50%";

  // Aggiungo l'immagine dell'artista prima del testo nel paragrafo
  albumDescription.insertBefore(artistImage, albumDescription.firstChild);

  // Aggiungo il testo relativo alle informazioni dell'album
  albumDescription.insertAdjacentText(
    "beforeend",
    ` ${artistName} ${releaseYear} ${trackCount} brani, ${totalDuration}`
  );

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