const artist = document.getElementById('artista')
const img = document.getElementById('back-img')
const visual = document.getElementById('visual')
const visual2 = document.getElementById('visual2')
const lista = document.getElementById('lista')

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

const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/412'

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
      applicaSeparatore(dati.nb_fan) + ' ' + 'ascoltatori mensili'
    visual2.innerText =
      applicaSeparatore(dati.nb_fan) + ' ' + 'ascoltatori mensili'

    // fetch track list

    fetch(artistUrl + '/top?limit=8')
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((dati) => {
        console.log('dati', dati)

        let i = 1
        dati.data.forEach((element) => {
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
          <div id="song" onclick="playAudio('${
            element.preview
          }')" class=" col-8 p-0">
            <span class="me-1 fs-6 text-light">${i}</span>
            <img
              src="${element.album.cover_small}"
              width="60"
              height="60"
              alt=""
            />
            <span class=" text-crop fs-6 text-light d-inline-block text-truncate" style="max-width: 200px !important;">${
              element.album.title
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

let player
let urlPlayer

function playAudio(url) {
  player = new Audio(url)
  player.play()
}

function stop() {
  player.pause()
  player.currentTime = 0
}

document.getElementById('pause').addEventListener('click', function () {
  stop()
})
