console.log("maps js page")


console.log("maps js page")



var map;
var infoWindow;
var input = document.getElementById('search');
var input = document.getElementById('search');
var types = document.getElementById('search');
var position = [];

function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    infoPane = document.getElementById('panel');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map = new google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 15
        });
        bounds.extend(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        // Call Places Nearby Search on user's location
        getNearbyPlaces(pos);
      }, () => {
        // Browser supports geolocation, but user has denied permission
        handleLocationError(true, infoWindow);
      });
    } else {
      // Browser doesn't support geolocation
      handleLocationError(false, infoWindow);
    }
// }
  // Handle a geolocation error
  function handleLocationError(browserHasGeolocation, infoWindow) {
    // Set default location to Seattle Wa
    pos = { lat: 47.6062100, lng: -122.3320700};
    map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 15
    });
    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Geolocation permissions denied. Using default location.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;
    // Call Places Nearby Search on the default location
    getNearbyPlaces(pos);
  }
  // Perform a Places Nearby Search Request
  function getNearbyPlaces(position) {
    let request = {
      location: position,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'Cannabis Stores'
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
  }
  // Handle the results (up to 20) of the Nearby Search
  function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarkers(results);
    }
  }



  // Set markers at the location of each place result
  function createMarkers(places) {
    places.forEach(place => {
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });
      // Add click listener to each marker
      google.maps.event.addListener(marker, 'click', () => {
        let request = {
          placeId: place.place_id,
          fields: ['name', 'formatted_address', 'geometry', 'rating', 'reviews',
            'website', 'photos']
        };
        /* Only fetch the details of a place when the user clicks on a marker. - 
        Dont want to hit the api limits */
        service.getDetails(request, (placeResult, status) => {
          showDetails(placeResult, marker, status)
        });
      });
      // Adjust the map bounds to include the location of this marker
      bounds.extend(place.geometry.location);
    });

    map.fitBounds(bounds);
  }

  // Builds an InfoWindow to display details above the marker
  function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let placeInfowindow = new google.maps.InfoWindow();
      let rating = "None";
      if (placeResult.rating) rating = placeResult.rating;
      placeInfowindow.setContent('<div><strong>' + placeResult.name +
        '</strong><br>' + 'Rating: ' + rating + '</div>');
      placeInfowindow.open(marker.map, marker);
      currentInfoWindow.close();
      currentInfoWindow = placeInfowindow;
      showPanel(placeResult);
    } else {
      console.log('showDetails failed: ' + status);
    }
  }

  // Displays place details in a sidebar
  function showPanel(placeResult) {
    // If infoPane is already open, close it
    if (infoPane.classList.contains("open")) {
      infoPane.classList.remove("open");
    }
    // Clear the previous details
    while (infoPane.lastChild) {
      infoPane.removeChild(infoPane.lastChild);
    }
    // Add the primary photo, if there is one
    if (placeResult.photos) {
      let firstPhoto = placeResult.photos[0];
      let photo = document.createElement('img');
      photo.classList.add('hero');
      photo.src = firstPhoto.getUrl();
      infoPane.appendChild(photo);
    }
    // Add place details with text formatting
    let name = document.createElement('h1');
    name.classList.add('place');
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating) {
      let rating = document.createElement('p');
      rating.classList.add('details');
      rating.textContent = `Rating: ${placeResult.rating} \u272e`;
      infoPane.appendChild(rating);
    }
    let address = document.createElement('p');
    address.classList.add('details');
    address.textContent = placeResult.formatted_address;
    infoPane.appendChild(address);
    if (placeResult.website) {
      let websitePara = document.createElement('p');
      let websiteLink = document.createElement('a');
      let websiteUrl = document.createTextNode(placeResult.website);
      websiteLink.appendChild(websiteUrl);
      websiteLink.title = placeResult.website;
      websiteLink.href = placeResult.website;
      websitePara.appendChild(websiteLink);
      infoPane.appendChild(websitePara);
    }
    // Open the infoPane
    infoPane.classList.add("open");

    }



    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    marker = [];

 //autocomplete search function
 var autocomplete = new google.maps.places.Autocomplete(input);
//  autocomplete.bindTo("bounds", map);

 console.log("autocomplete starts");

 autocomplete.setFields(
     ['geometry']);
     var infoWindow = new google.maps.InfoWindow();
     var infoWindowContent = document.getElementById('search')
    infoWindow.setContent(infoWindowContent);

    autocomplete.addListener('place_changed', function() {
        infoWindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No Details Available for input");
            return;
        }

        console.log(place.geometry);

    if (place.geometry.viewpoint){
        map.fitBounds(place.geometry.viewpoint);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
    }  

    console.log(place.geometry.location);

    createMarkers();
    
//take out here

    // console.log(place.geometry.viewpoint);
    // var loca = (place.geometry.viewpoint);
    // console.log("set loca " + loca)

    // getNearbyPlaces(pos);

    // function createMarkers(places) {
    //   places.forEach(place => {
    //     let marker = new google.maps.Marker({
    //       position: place.geometry.location,
    //       map: map,
    //       title: place.name
    //     });
    //     google.maps.event.addListener(marker, 'click', () => {
    //       let request = {
    //         placeId: place.place_id,
    //         fields: ['name', 'formatted_address', 'geometry', 'rating', 'reviews',
    //           'website', 'photos']
    //       };
    //       /* Only fetch the details of a place when the user clicks on a marker. - 
    //       Dont want to hit the api limits */
    //       service.getDetails(request, (placeResult, status) => {
    //         showDetails(placeResult, marker, status)
    //       });
    //     });
    //     // Adjust the map bounds to include the location of this marker
    //     bounds.extend(place.geometry.location);
    //   });
    //   /* Once all the markers have been placed, adjust the bounds of the map to
    //    * show all the markers within the visible area. */
    //   map.fitBounds(bounds);

    // }
    // console.log(place.geometry.location);

    


    // console.log(place.geometry.viewpoint);
    // var loca = (place.gementry.viewpoint);
    // console.log("set loca " + loca)

    // getNearbyPlaces(pos);

    // var address = '';
    // if (place.address_components) {
    //   address = [
    //     (place.address_components[0] && place.address_components[0].short_name || ''),
    //     (place.address_components[1] && place.address_components[1].short_name || ''),
    //     (place.address_components[2] && place.address_components[2].short_name || '')
    //   ].join(' ');
    // }

    //take out here

    // infowindowContent.children['place-icon'].src = place.icon;
    // infowindowContent.children['place-name'].textContent = place.name;
    // infowindowContent.children['place-address'].textContent = address;
    // infowindow.open(map, marker);
  });
    
      document.getElementById('search')
          .addEventListener('click', function() {
          });
}




function handleLocationError (content, poistion){
    infoWindow.setPosition(poistion);
    infoWindow.setContent(content);
    infoWindow.open(map);
    map.setCenter(pos);
}