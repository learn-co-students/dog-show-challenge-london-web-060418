document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs()
  createEventListener()
})

function fetchAllDogs() {
    fetch('http://localhost:3000/dogs')
    .then((response) => response.json())
    .then((dogData) => {
        let dogArray = dogData.map((dog) => new Dog(dog.id, dog.name, dog.breed, dog.gender))
        renderDogs(dogArray)
    })
}

function getTable() {
    return document.querySelector('#table-body')
}

function renderDogs(dogArray) {
    let table = getTable()
    dogArray.forEach((dog) => {
        table.innerHTML += dog.render()
    })
}

function editDog(id, name, breed, sex) {
    // function start (getDogInput? (make sure to look up ES6 destructuring (extra points!!)))
    const nameInput = document.getElementById('name-input')
    const breedInput = document.getElementById('breed-input')
    const sexInput = document.getElementById('sex-input')
    // function end
    nameInput.value = name
    breedInput.value = breed
    sexInput.value = sex
    editEventListener(id)
}

function createEventListener() {
    document.getElementById('dog-form').addEventListener('submit', createSubmit)
}

function editEventListener(id) {
    document.getElementById('dog-form').removeEventListener('submit', createSubmit)
    document.getElementById('dog-form').addEventListener('submit', editSubmit.bind(id))
}

function addDog(dog) {
    let table = getTable()
    table.innerHTML += dog.render()
}

function updateDog(dog) {
    updatedDog = document.createElement("tr")
    updatedDog.id = dog.id
    // dog.id = updateDog.id

    updatedDog.innerHTML=`
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button onclick="editDog(${dog.id}, '${dog.name}', '${dog.breed}', '${dog.sex}');">Edit</button></td>`

    document.getElementById('table-body').replaceChild(updatedDog, document.getElementById(updatedDog.id))
}

function createSubmit(e) {
    const nameInput = document.getElementById('name-input')
    const breedInput = document.getElementById('breed-input')
    const sexInput = document.getElementById('sex-input')
    e.preventDefault()
    let data = {
        name: nameInput.value,
        breed: breedInput.value,
        gender: sexInput.value
    }
    fetch('http://localhost:3000/dogs', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((dogData) => {
            addDog(new Dog(dogData.id, dogData.name, dogData.breed, dogData.gender))
            nameInput.value = ""
            breedInput.value = ""
            sexInput.value = ""
        })
}

function editSubmit(e) {
    const form = document.getElementById('dog-form')
    const nameInput = document.getElementById('name-input')
    const breedInput = document.getElementById('breed-input')
    const sexInput = document.getElementById('sex-input')
    e.preventDefault()
    data = {
        name: nameInput.value,
        breed: breedInput.value,
        gender: sexInput.value
    }
    fetch(`http://localhost:3000/dogs/${this}`, {
      method: "PATCH",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((dogData) => {
      updateDog(new Dog(dogData.id, dogData.name, dogData.breed, dogData.gender))
      nameInput.value = ""
      breedInput.value = ""
      sexInput.value = ""
      document.getElementById('form-container').replaceChild(form.cloneNode(true),form)
      document.getElementById('dog-form').addEventListener('submit', createSubmit)
    })
}
