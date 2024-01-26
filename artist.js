const getArtistFromUrl = function () {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  const searchParams = url.searchParams // paramatres di query dall'URL
  const artistId = searchParams.get('artistId')
  return artistId
}

const artist = document.getElementById('artista')
const img = document.getElementById('back-img')
const visual = document.getElementById('visual')
const visual2 = document.getElementById('visual2')
const lista = document.getElementById('lista')

const canzoni = []

function applicaSeparatore(importoNumerico) {
  var importo = importoNumerico.toString()
  if (importo.length > 3) {
    importo = importo
      .split('', importo.length)
      .reverse()
      .join('')
      .replace(/([0-9]{3})/g, '$1.')
    importo = importo.split('', importo.length).reverse().join('')
  }
  return importo
}

function applicaSeparatore2(importoNumerico) {
  var importo = importoNumerico.toString()
  if (importo.length > 3) {
    importo = importo
      .split('', importo.length)
      .reverse()
      .join('')
      .replace(/([0-9]{3})/g, '$1.')
    importo = importo
      .split('', importo.length - 1)
      .reverse()
      .join('')
  }
  return importo
}

const fullPlayer = function (data) {}

function timing(duration) {
  const slots = []
  duration = Math.ceil(duration)
  while (duration > 59 && slots.length < 2) {
    slots.push((duration % 60).toString().padStart(2, '0'))
    duration = Math.floor(duration / 60)
  }
  if (duration > 0) slots.push(duration)
  return slots.reverse().join(':')
}
const artistId = getArtistFromUrl()
const artistUrl =
  'https://striveschool-api.herokuapp.com/api/deezer/artist/' + artistId

fetch(artistUrl)
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((dati) => {
    console.log(dati)
    artist.innerText = dati.name
    document.getElementById('top-img').style.backgroundImage =
      'url(' + dati.picture_xl + ')'
    visual.innerText =
      applicaSeparatore2(dati.nb_fan) + ' ' + 'ascoltatori mensili'
    visual2.innerText =
      applicaSeparatore2(dati.nb_fan) + ' ' + 'ascoltatori mensili'

    // fetch track list

    fetch(artistUrl + '/top?limit=8')
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((dati) => {
        console.log('dati', dati)
        fullPlayer(dati)
        let i = 1
        dati.data.forEach((element) => {
          console.log(element)
          canzoni.push(element)
          const li = document.createElement('li')
          li.classList.add(
            'row',
            'list-group-item',
            'd-flex',
            'align-items-center',
            'justify-content-between',
            'align-items-center',
            'mb-lg-4',
            'mb-sm-2'
          )
          li.innerHTML = `
          <div id="song" onclick="playAudio(event,'${
            element.preview
          }')" class=" col-8 p-0">
            <span id="indice" class="me-2 fs-6 text-light">${i}</span>
            <img
              src="${element.album.cover_small}"
              width="60"
              height="60"
              alt=""
            />
            <span id="testo" class=" text-crop fs-6 text-light d-inline-block text-truncate ms-2" style="max-width: 200px !important;">${
              element.title
            }</span>
          </div>
          <span class="col-2 p-0 text-secondary fs-6">${applicaSeparatore2(
            element.rank
          )}</span>
          <span class="col-2 p-0 text-secondary fs-6">${timing(
            element.duration
          )}</span>
          
        `
          i++
          lista.appendChild(li)
        })
        console.log(canzoni)
      })
  })
  .catch((response) => {
    throw Error(response)
  })

document
  .getElementsByClassName('bi-shuffle')[0]
  .addEventListener('click', function () {
    document
      .getElementsByClassName('bi-shuffle')[0]
      .classList.toggle('text-play')
    document.getElementsByClassName('bi-dot')[0].classList.toggle('d-none')
  })
let countsecond = 0
let player
let urlPlayer
let counter
function playAudio(e, url) {
  player = new Audio(url)
  player.play()
  counter = setInterval(contatore, 1000)
  contatore()
  e.target.closest('#testo').classList.toggle('testo')
  document.getElementById('player').classList.toggle('d-none')
  document.getElementById('buttonBar').classList.toggle('d-none')
  let volume = document.getElementById('volume-slider')

  document.getElementById('volumeOut').addEventListener('click', function () {
    player.volume = 0
    volume.value = 0
  })
  volume.addEventListener('input', function (e) {
    player.volume = e.currentTarget.value / 100
  })

  const div = e.target.closest('#song')

  const now = document.getElementById('now-song')
  now.innerHTML = div.innerHTML

  now.querySelector('.me-2').classList.add('d-none')
}
function stop() {
  document.getElementsByClassName('testo')[0].classList.toggle('testo')
  document.getElementById('player').classList.toggle('d-none')
  document.getElementById('buttonBar').classList.toggle('d-none')
  player.pause()
  player.currentTime = 0
  stopcounter()
}

document.getElementById('pause-player').addEventListener('click', function (e) {
  console.log(e.target)
  stop()
})

function stopcounter() {
  clearInterval(counter)
  countsecond = 0
  document.getElementById('bar').style.width = countsecond + '%'
}

function contatore() {
  document.getElementById('bar').style.width = countsecond + '%'
  countsecond = countsecond + 3
  console.log(countsecond)
  if (countsecond > 95) {
    countsecond = 0
    stopcounter()
  }
}

const profile1 = document.getElementById('1')
const profile2 = document.getElementById('2')
const profile3 = document.getElementById('3')
const profile4 = document.getElementById('4')

profile1.addEventListener('click', function () {
  cambia(profile1.innerText)
})
profile2.addEventListener('click', function () {
  cambia(profile2.innerText)
})
profile3.addEventListener('click', function () {
  cambia(profile3.innerText)
})
profile4.addEventListener('click', function () {
  cambia(profile4.innerText)
})

const cambia = function (nome) {
  const valore = document.getElementById('profilo')
  valore.innerText = nome
}
