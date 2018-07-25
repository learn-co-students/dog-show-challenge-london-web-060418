//requests information and returns it

class Adapter {
  //get the dogs data and parse it into json data
  static getDogs() {
    const url = `http://localhost:3000/dogs/`
    return fetch(url)
    .then(response => response.json())
  }

  static getDoge(id) {
    const url = `http://localhost:3000/dogs/${id}`
    return fetch(url)
    .then(response => response.json())
  }

  static createNewDoge(dogObj) {
    //when creating a new one, POST to the index page, not the ID
    const url = `http://localhost:3000/dogs`
    //REMEMBER YOUR COMMAS PLS
    return fetch(url, {
      //METHODS - default is a GET
      method: "POST",
      //headers points to an object
      headers: {
        'Content-Type': 'application/json'
      },
      //stringify to send data to the database
      body: JSON.stringify(dogObj)
    })
    //parse it to JSON
    .then(response => response.json())
  }

}
