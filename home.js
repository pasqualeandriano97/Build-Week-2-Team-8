const search = document.getElementById("search");
const searchBar = document.getElementById("searchBarDiv");
const form = document.getElementById("formSearch");
const formInput = document.getElementById("formInput");
const image1 = document.getElementById("image1");
const title1 = document.getElementById("title1");
const artist1 = document.getElementById("artist1");
const artist2 = document.getElementById("artist2");
const row1 = document.getElementById("row1");
const dNone1 = document.getElementById("d-none");
const toArtistPage = document.getElementById("toArtistPage");
let album = "";

const dNone = () => {
  searchBar.classList.toggle("d-none");
};
search.addEventListener("click", (e) => {
  e.preventDefault();
  dNone();
});

const card = document.querySelectorAll(".nascosto");
const deleteCard = () => {
  card.forEach((card) => {
    card.classList.add("d-none");
  });
};

const title = (text) => {
  title1.innerText = text;
};

const artist = (text) => {
  artist1.innerText = text;
};

const artistSpan = (text) => {
  artist2.innerText = text;
};

const navigazioneInalbumPage = function (id) {
  let parametro = id;
  window.location.href = "./albumPage.html" + "?singleAlbum=" + parametro;
};

const createCard = (data) => {
  console.log(data[0].album.title);

  for (let i = 1; i < 7; i++) {
    const col = document.createElement("div");
    col.classList.add("col-6", "m-0");

    col.innerHTML = `<a class="text-decoration-none" href="${
      "./albumPage.html" + "?singleAlbum=" + data[i].album.id
    }"><div class="card bg-dark text-white carte my-2">
  <div class="card-body d-flex p-0">
    <img
      src="${data[i].album.cover}"
      class="img-fluid rounded-end col-md-4"
      alt="Immagine Mini Card 5"
    />
    <div class="d-flex flex-column col-md-8 ms-2 py-2 justify-content-center ">
    <p class="card-text">${data[i].album.title}</p>
      
    </div>
  </div>
</div></a>`;
    row1.appendChild(col);
  }
};
const countCols = () => {
  let cols = document.querySelectorAll(".carte");
  console.log(cols.length);

  if (cols.length >= 12) {
    for (let i = 0; i < cols.length - 6; i++) {
      cols[i].remove();
    }
  }
};

let params = "";

const searchData = (event) => {
  const value = event.target.value;
  console.log("Searching...", value);
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=" + value)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      title(response.data[0].album.title);
      artist(response.data[0].artist.name);
      artistSpan(response.data[0].artist.name);
      toArtistPage.href =
        "./artistPage.html" + "?artistId=" + response.data[0].artist.id;
      let src = response.data[0].album.cover_big;
      image1.src = src;
      album = response.data[0].album.id;
      albumFind();
      deleteCard();
      dNone();
      createCard(response.data);
      countCols();
    })
    .catch((e) => {});
};

const debounce = (callback, waitTime) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, waitTime);
  };
};

const debounceHandler = debounce(searchData, 1000);
formInput.addEventListener("input", debounceHandler);

console.log(image1);
const albumFind = () => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + album)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })

    .then((response) => {
      console.log(response);
    });
};
