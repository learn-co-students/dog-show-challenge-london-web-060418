class DogController {

  static renderDog(dog) {
    const newEntry = document.createElement('tr')
    newEntry.id = `dog-${dog.id}`

    newEntry.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.gender}</td>
    <td><button data-id="${dog.id}">O</button></td>
    `
    newEntry.querySelector('td button').addEventListener('click', DogController.editDog)

    document.querySelector('#table-body').append(newEntry)
  }

  static addDog(e) {
    e.preventDefault()

    const dogInfo = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      gender: e.target.sex.value
    }

    Adapter.createDog(dogInfo).then(dog => DogController.renderDog(dog))
  }

  static editDog(e) {
    const dogId = e.target.dataset.id
    const dogForm = document.querySelector('#dog-form')
    dogForm.removeEventListener('submit', DogController.addDog)
    dogForm.addEventListener('submit', DogController.updateDog)
    const inputs = dogForm.querySelectorAll('input')
    inputs[3].value = "Edit"
    inputs[3].dataset.id = dogId

    Adapter.fetchDogBy(dogId).then( resp => {
      inputs[0].value = resp.name
      inputs[1].value = resp.breed
      inputs[2].value = resp.gender
    })
  }

  static updateDog(e) {
    e.preventDefault()

    const dogForm = document.querySelector('#dog-form')
    dogForm.removeEventListener('submit', DogController.updateDog)
    dogForm.addEventListener('submit', DogController.addDog)
    const inputs = dogForm.querySelectorAll('input')
    inputs[3].value = "Submit"
    const dogId = inputs[3].dataset.id

    const dogInfo = {
      id: dogId,
      name: inputs[0].value,
      breed: inputs[1].value,
      gender: inputs[2].value
    }
    console.log(dogInfo)
    Adapter.updateDog(dogInfo).then( resp => {
      console.log(resp)
      const dogEntry = document.querySelector(`#dog-${resp.id}`)
      const columns = dogEntry.querySelectorAll('td')

      columns[0].innerText = resp.name
      columns[1].innerText = resp.breed
      columns[2].innerText = resp.gender
    })
  }
}
