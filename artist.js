let qeen = 'playlist'

fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/412')
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((dati) => {
    console.log(dati)
  })
