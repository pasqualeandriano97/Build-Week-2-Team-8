const search = document.getElementById("search");
const searchBar = document.getElementById("searchBarDiv");
const form = document.getElementById("formSearch");
const formInput = document.getElementById("formInput");

const dNone = () => {
  searchBar.classList.toggle("d-none");
};
search.addEventListener("click", (e) => {
  e.preventDefault();
  dNone();
});

let params = "";

const searchData = (event) => {
  const value = event.target.value;
  console.log("Searching...", value);
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=" + value)
    .then((res) => {
      return res.json().then((response) => {
        console.log(response);

        formInput.value = "";
        dNone();
      });
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
