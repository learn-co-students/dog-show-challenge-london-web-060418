// class Adapter {
//   static getDogs() {
//     console.log('its the adapter, im being run')
//     const url = `http://localhost:3000/dogs`
//     return fetch(url)
//            .then(res => res.json())
//            .then(res => console.log())
//   }
// }


// class Adapter {
//   static getChores() {
//     const url = `http://localhost:3000/chores/`
//     return fetch(url)
//       .then(r => r.json())
//   }
//
//   static createChore(data) {
//     const url = `http://localhost:3000/chores/`
//     const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     }
//     return fetch(url, options)
//       .then(r => r.json())
//   }
// }
