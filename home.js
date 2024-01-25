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
const playerButton = document.getElementById("playerButton");
const footer = document.getElementById("player");
let album = "";
const audioM = document.getElementById("audioM");

let temp = "x";
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
const dNone = () => {
  searchBar.classList.toggle("d-none");
};
const dnoneF = () => {
  footer.classList.remove("d-none");
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

const ciao = [];
const compileFooter = (data) => {
  const img = document.getElementById("player-img");
  const title = document.getElementById("title-song");
  const artist = document.getElementById("artist-player");
  img.src = data[0].album.cover;
  title.innerText = data[0].album.title;
  artist.innerText = data[0].artist.name;
};
const createCard = (data) => {
  for (let i = 1; i < data.length; i++) {
    ciao.push(data[i].album.title);

    if (ciao[i] != temp) {
      temp = data[i].album.title;

      const col = document.createElement("div");
      col.classList.add("col", "m-0", "carte", "bg-dark", "p-1");

      col.innerHTML = `<a class="text-decoration-none " href="${
        "./albumPage.html" + "?singleAlbum=" + data[i].album.id
      }"><div class="card bg-dark text-white  p-0">
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
      if (ciao.length >= 30) {
        ciao.splice(0, ciao.length);
      }
    } else {
      console.log("Non ho ripetuto");
    }
  }
};

const countCols = () => {
  let cols = document.querySelectorAll(".carte");

  if (cols.length > 6) {
    for (let i = 0; i < cols.length - 6; i++) {
      cols[i].classList.add("d-none");
    }
  }
};

let params = "";
let zero = 0;

let volume = document.getElementById("volume-slider");

const searchData = (event) => {
  let value;
  if (event) {
    value = event.target.value;
  } else {
    value = "drake";
  }

  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=" + value)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      title(response.data[0].album.title);
      artist(response.data[0].artist.name);
      artistSpan(response.data[0].artist.name);
      toArtistPage.href =
        "./artistPage.html" + "?artistId=" + response.data[0].artist.id;
      let src = response.data[0].album.cover_big;
      image1.src = src;
      album = response.data[0].album.id;

      deleteCard();
      dNone();
      console.log(response.data[0].preview);
      compileFooter(response.data);
      audioM.src = response.data[0].preview;
      playerButton.addEventListener("click", (e) => {
        playAudio(e);
        dnoneF();
      });

      createCard(response.data);

      countCols();
    })
    .catch((error) => {
      alert(error + "si è verificato un errore");
    });
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
searchData();
const debounceHandler = debounce(searchData, 1000);
formInput.addEventListener("input", debounceHandler);
let countsecond = 0;
let player;
let urlPlayer;
let counter;
function playAudio(e) {
  audioM.play();

  counter = setInterval(contatore, 1000);
  contatore();
  document.getElementById("player").classList.toggle("d-none");
  let volume = document.getElementById("volume-slider");
  volume.addEventListener("input", function (e) {
    audioM.volume = e.currentTarget.value / 100;
  });
}
function stopcounter() {
  clearInterval(counter);

  countsecond = 0;

  document.getElementById("bar").style.width = countsecond + "%";
}

function stop() {
  document.getElementById("player").classList.toggle("d-none");
  audioM.pause();
  audioM.currentTime = 0;
  stopcounter();
}

document.querySelector("#pause-player").addEventListener("click", function (e) {
  console.log(e.target);
  stop();
});

function contatore() {
  document.getElementById("bar").style.width = countsecond + "%";
  countsecond = countsecond + 3;
  console.log(countsecond);
  if (countsecond > 95) {
    countsecond = 0;
    stopcounter();
  }
}

const navigazioneInalbumPage = function (id) {
  let parametro = id;
  window.location.href = "./albumPage.html" + "?singleAlbum=" + parametro;
};
