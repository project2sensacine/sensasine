let geocoder;
var map;
var service;
let infowindow;
let request;

//initiator
function initMap() {
  // var movieLocation = results[0].geometry.location();
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  let mapOptions = {
    zoom: 15,
    center: codeAddress()
  };
  request = {
    // location: new google.maps.LatLng(results[0].geometry.bounds, results[0].geometry.bounds),
    // radius: "5000",
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(40.217815, -4.17753),
      new google.maps.LatLng(40.623464, -3.474426)
    ),
    type: ["movie_theater"]
  };

  map = new google.maps.Map(document.getElementById("placeMap"), mapOptions);

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}

//geocoder
function codeAddress() {
  let address = document.getElementById("address").value;
  geocoder.geocode({
      address: address
    },
    function (results, status) {
      if (status == "OK") {

        map.setCenter(results[0].geometry.location);

        let marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }
  );
}



// places
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}