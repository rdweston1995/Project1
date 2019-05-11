let pos;
let map;
function initMap() {
  // Set the default location and initialize all variables
  pos = { lat: -33.857, lng: 151.213 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
  });
}