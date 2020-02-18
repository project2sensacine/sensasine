let geocoder;
var map;
var service;
let infowindow;

//initiator
function initMap() {
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  let mapOptions = {
    zoom: 10,
    center: codeAddress()
  };

  map = new google.maps.Map(document.getElementById("placeMap"), mapOptions);

  let request = {
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(54.69726685890506, -2.7379201682812226),
      new google.maps.LatLng(55.38942944437183, -1.2456105979687226)
    ),
    type: ["movie_theater"]
  };

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}

//geocoder
function codeAddress() {
  let address = document.getElementById("address").value;
  geocoder.geocode(
    {
      address: address
    },
    function(results, status) {
      if (status == "OK") {
        map.setCenter(results[0].geometry.location);

        let marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
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

  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
