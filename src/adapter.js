class Adapter {
  static f () {
    fetch( 'http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => renderDogRows(json))
  }
  static fp (id, body) {
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(json => console.log(json));
  }
}
