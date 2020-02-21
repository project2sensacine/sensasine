let geocoder;
var map;
var service;
let infowindow;
let request;


//initiator
function initMap() {


  // var movieLocation = results[0].geometry.location();
  geocoder = new google.maps.Geocoder();
  geocoder1 = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  const coords = coordinates()

  coords.then(x => {

    let mapOptions = {
      zoom: 15,
      center: codeAddress()
    };
    request = {
      location: new google.maps.LatLng(x.lat, x.lng),
      radius: 5500,
      type: ["movie_theater"]
    };
    map = new google.maps.Map(document.getElementById("placeMap"), mapOptions);
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  })
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
function coordinates() {
  let address = document.getElementById("address").value;
  let coords = {}
  return new Promise((resolve, reject) => {
    geocoder1.geocode({
      address: address
    },
      (resultsPlace, status) => {
        if (status == "OK") {
          coords.lat = resultsPlace[0].geometry.location.lat()
          coords.lng = resultsPlace[0].geometry.location.lng()
          resolve(coords)
        } else {
          reject(new Error('No results found'))
        }
      })
  });
}




function callback(resultsPlace, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < resultsPlace.length; i++) {
      createMarker(resultsPlace[i]);
    }
  }
}

function createMarker(resultsPlace) {

  var marker1 = new google.maps.Marker({
    map: map,
    position: resultsPlace.geometry.location,

  });

  google.maps.event.addListener(marker1, 'click', function () {
    infowindow.setContent(resultsPlace.name);
    infowindow.open(map, this);

  });
}