//reads and writes to the DOM
//accepts params and instantiates doges
// const form = document.querySelector('#dog-form')

class dogController {

  static init() {
    //calls the adapter, gets the data, chains a .then function onto it and sends it to renderDoge function
    Adapter.getDogs()
    .then(data => dogController.renderDoge(data))
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', dogController.createDoge)
  }

  //function to get each doge on the page
   static renderDoge(data) {
    data.forEach(doge => {
      let tableRow = document.createElement('tr')

      tableRow.innerHTML = `
        <td>${doge.name}</td>
        <td>${doge.breed}</td>
        <td>${doge.gender}</td>
        <td><button id=${doge.id}>Edit!</button></td>
        `
      let btn = tableRow.querySelector('td button')
      //add event listener to each button with the appropes id
      btn.addEventListener('click', dogController.editDoge)
      //appends the new row to the table which already exists
      let table = document.querySelector("#table-body")
      table.append(tableRow)
    })
  }

  static editDoge(e) {
    const form = document.querySelector('#dog-form')
    Adapter.getDoge(e.target.id)
    .then(r => {
      form.name.value = r.name
      form.breed.value = r.breed
      form.sex.value = r.gender
    })
  }

  static createDoge(e) {
    //prevent refreshing of the page which is the default on a form when submit clicked
    e.preventDefault()
    const dogObj = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      gender: e.target.sex.value
    }
    Adapter.createNewDoge(dogObj)
    .then(r => dogController.renderDoge([r]))
  }




}
