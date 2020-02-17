function initMap() {
  console.log("rsto pasa")
  // let initialCoords = {
  //   lat: 40.4165001,
  //   lng: -3.7025599
  // };

  let mapOptions = {
    // center: User.location,
    zoom: 10
  };
  let myMap = new google.maps.Map(
    document.getElementById('placeMap'), mapOptions);
  //getPlaces();
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