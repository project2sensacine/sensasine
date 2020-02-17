// function initMap() {
//   console.log("rsto pasa")
//   let initialCoords = {
//     lat: 40.4165001,
//     lng: -3.7025599
//   };

//   let mapOptions = {
//     center: initialCoords,
//     zoom: 10
//   };
//   let myMap = new google.maps.Map(
//     document.getElementById('placeMap'), mapOptions);
//   //getPlaces();
// }
let geocoder;
let map;

function initMap() {
  geocoder = new google.maps.Geocoder();

  let mapOptions = {
    zoom: 10,
    center: codeAddress()
  }
  map = new google.maps.Map(document.getElementById('placeMap'), mapOptions);
}

function codeAddress() {
  let address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: map,

        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}







// function getPlaces() {
//   axios
//     .get("/places/api")
//     .then(response => {
//       const allPlaces = response.data;
//       console.log("el array de places es:", allPlaces);
//       placePlacesInMap(allPlaces);
//     })
//     .catch(error => console.log(error));
// }

// function placePlacesInMap(places) {
//   places.forEach(place => {
//     const center = {
//       lat: place.location.coordinates[1],
//       lng: place.location.coordinates[0]
//     };
//     new google.maps.Marker({
//       position: center,
//       map: myMap,
//       title: place.name
//     });
//   });
// }