const input = document.getElementsByTagName("input")[0];

const toHomePage = () => {
  window.location.href = "/homePage.html" + "?search=" + input.value;
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

const debounceHandler = debounce(toHomePage, 1000);
input.addEventListener("input", debounceHandler);
