class Adapter {

  static fetchDogs() {
    return fetch('http://starkiller-api.herokuapp.com/api/v1/dogs')
    .then( r => r.json() )
  }

  static fetchDogBy(id) {
    return fetch(`http://starkiller-api.herokuapp.com/api/v1/dogs/${id}`)
    .then( r => r.json() )
  }

  static createDog(dogInfo) {
    return fetch('http://starkiller-api.herokuapp.com/api/v1/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: dogInfo.name,
        breed: dogInfo.breed,
        gender: dogInfo.gender
      })
    })
    .then( r => r.json() )
  }

  static updateDog(dogInfo) {
    return fetch(`http://starkiller-api.herokuapp.com/api/v1/dogs/${dogInfo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: dogInfo.id,
        name: dogInfo.name,
        breed: dogInfo.breed,
        gender: dogInfo.gender
      })
    })
    .then( r => r.json() )
  }
}
