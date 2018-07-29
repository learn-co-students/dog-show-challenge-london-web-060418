document.addEventListener('DOMContentLoaded', function(){

  fetch("http://localhost:3000/dogs")
         .then(res => res.json())
         .then(json => renderDogs(json))

  let dogsTable = document.getElementById("table-body")
  let form = document.getElementById("dog-form")
  let currentDogId;

  function renderDogs(json){
    json.forEach(function(dog){
      let dogTr = document.createElement("tr")
      dogTr.innerHTML =  `<td>${dog.name}</td>
       <td>${dog.breed}</td>
       <td>${dog.gender}</td>
       <td><button id=${dog.id}>Edit</button></td>`
       //gets the id from the json file nothing is created
      dogsTable.append(dogTr)
      //console.log(dog.id)
    })
  }

  let table = document.querySelector("table")

  table.addEventListener("click", function(e){
    if (e.target.innerText === "Edit"){
      row = e.target.parentNode.parentNode
      //where the button was clicked inside which table data inside which table row
      //console.log(e.path[2])

      //declared in global and then assigned here
      currentDogId = e.target.id    //dog's id !!!!
      console.log(currentDogId)
      //console.log(row)
      editDog(row)
    }
  })

  function editDog(row) {
    //form.name is the empty field
    //we assign the value from the previous function
    //get the data from the table and put it int the form fields in the correct order
    //name , breed and Sex
    //take from table put into Form

    form.name.value = row.querySelectorAll('td')[0].innerText
    form.breed.value = row.querySelectorAll('td')[1].innerText
    form.gender.value = row.querySelectorAll('td')[2].innerText
  }

  //
  form.addEventListener("submit", getDogFromForm)

  //now we have the data we just edited and the function prevents the Default
  function getDogFromForm(e){
    e.preventDefault();
    let editedDog = {
      // name: document.getElementById('name').value,
      //saved it in the editedDog variable and called the patch function with this as a parameter

      //we make an object with the new values in the form
      name: form.name.value,
      breed: form.breed.value,
      gender: form.gender.value
    }
    patchDog(editedDog)
  }

  function renderDog(dog){
    let dogIsComingTr = document.getElementById(dog.id).parentNode.parentNode
    console.log(dogIsComingTr)
    dogIsComingTr.querySelectorAll('td')[0].innerText = dog.name
    dogIsComingTr.querySelectorAll('td')[1].innerText = dog.breed
    dogIsComingTr.querySelectorAll('td')[2].innerText = dog.gender
  }

  function patchDog(dog){
    //console.log(currentDogId)
    fetch(`http://localhost:3000/dogs/${currentDogId}`, {
       method: 'PATCH',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(dog),
     })
     .then(res => res.json())
     //.then(dog => console.log(dog.id));
     .then(dog => renderDog(dog));
   }
});
