let qeen = 'playlist'

fetch(' https://striveschool-api.herokuapp.com/api/deezer/search?q=' + qeen)
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((dati) => {
    console.log(dati)
  })
