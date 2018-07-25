document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#dog-form').addEventListener('submit', DogController.addDog)
  Adapter.fetchDogs().then(dogs => dogs.forEach(DogController.renderDog))
})
