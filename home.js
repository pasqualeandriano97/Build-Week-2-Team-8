const search = document.getElementById("search");
const searchBar = document.getElementById("searchBarDiv");
const form = document.getElementById("formSearch");
const formInput = document.getElementById("formInput");

const dNone = () => {
  searchBar.classList.toggle("d-none");
};
search.addEventListener("click", () => {
  dNone();
});

let params = "";

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   params = formInput.value;
//   fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=" + params)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then((dati) => {
//       console.log(dati);
//       formInput.value = "";
//     });
// });

// const makeAPICall = (searchValue) => {
//   if (!searchValue) {
//     return;
//   }
//   params = searchValue;
//   fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=" + params)
//     .then((res) => {
//       return res.json().then((response) => {
//         console.log(response);

//         console.log("ciao");
//       });
//     })
//     .catch((e) => {});
// };

// const debounce = (fn, delay = 1000) => {
//   let timerId = null;
//   return (...args) => {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => fn(...args), delay);
//   };
// };

// const onInput = debounce(makeAPICall, 2000);

// formInput.addEventListener("input", (e) => {
//   makeAPICall(e.target.value);
// });

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
