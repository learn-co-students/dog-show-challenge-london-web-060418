let currentDogId = 0

class DogController {

  static init(){
    Adapter.getDogs()
    .then(DogController.renderDogs)
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', DogController.handleSubmit)
    const table = document.querySelector('#table-body')
    table.addEventListener('click', DogController.editDog)
  }

  static renderDogs(dogs) {
    dogs.forEach(DogController.renderDog)
  }

  static renderDog(dog) {
    const table = document.querySelector('#table-body')
    const dogElement = DogController.createDogElement(dog)
    table.append(dogElement)
  }

  static createDogElement(dog) {
    let tr = document.createElement('tr')
    tr.id = 'tr'+dog.id
    tr.innerHTML =
    `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.gender}</td>
    <td><button class="edit-dog" id=${dog.id}>Edit Dog</button></td>
    `
    return tr
  }

  static editDog(e) {
    currentDogId = e.target.id
    let dog = Adapter.getDog(e.target.id).then(dog => {
      let form = document.querySelector('#dog-form')
      form.name.value = dog.name
      form.breed.value = dog.breed
      form.sex.value = dog.gender
    })
  }

  static handleSubmit(e) {
    e.preventDefault()
    const data = {
      id: currentDogId,
      name: e.target.name.value,
      breed: e.target.breed.value,
      gender: e.target.sex.value
    }
    Adapter.editDog(currentDogId, data)
    .then(DogController.reRenderDog)
  }

  static reRenderDog(dog) {
    let row = document.querySelector(`#tr${dog.id}`)
    row.innerHTML =
    `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.gender}</td>
    <td><button class="edit-dog" id=${dog.id}>Edit Dog</button></td>
    `
  }


}//Class
