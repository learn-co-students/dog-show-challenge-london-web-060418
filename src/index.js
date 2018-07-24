document.addEventListener('DOMContentLoaded', init)
let currentDog

  function init(){
    Adapter.f()
    delegateEditEvent()
  }


  function delegateEditEvent() {
    let table = document.querySelector('table')
    table.addEventListener('click', function(e){
      if (e.target.innerText === 'Edit'){
        row = e.target.parentNode.parentNode
        currentDog = parseInt(row.id)
        fillForm(row)
      }
    })
  }

function renderDogRows(data){
  table = document.querySelector('table')
  data.forEach((dog) => {
    createDogRow(table, dog);
  })
}

function createDogRow(table, dog) {

  let row = table.insertRow()
  row.id = dog.id

  let name = row.insertCell(0)
  let breed = row.insertCell(1)
  let sex = row.insertCell(2)
  let edit = row.insertCell(3)

  name.innerHTML = dog.name;
  breed.innerHTML = dog.breed;
  sex.innerHTML = dog.gender;
  edit.innerHTML = `<button id=${dog.id}>Edit</button>`;
}

function fillForm (row) {
  name = row.querySelectorAll('td')[0].innerText
  breed = row.querySelectorAll('td')[1].innerText
  gender = row.querySelectorAll('td')[2].innerText
  console.log(gender)
  document.getElementById('name').value = name
  document.getElementById('breed').value = breed
  document.getElementById('sex').value = gender
}

function getBody() {
  return {
  name: document.getElementById('name').value,
  breed: document.getElementById('breed').value,
  gender: document.getElementById('sex').value
  }
}


form = document.getElementById('dog-form')

form.addEventListener('submit', function(){
  Adapter.fp(currentDog, getBody())
})
