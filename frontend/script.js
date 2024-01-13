//create disasterIcons for each disaster.
var disasterIcons = {
  flood: L.icon({
    iconUrl: 'media/flood.png', // Replace with the path to your icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
  }),
  earthquake: L.icon({
    iconUrl: 'media/earthquake.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  }),
  tornado: L.icon({
    iconUrl: 'media/tornado.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  }),
  hurricane: L.icon({
    iconUrl: 'media/hurricane.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  })
};


let markers = [];

// Fetch JSON data from the backend
fetch("/", { method: "POST" })
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    // Try to parse the text as JSON
    const data = JSON.parse(text);

    data.forEach((element) => {
      let opacity = element.intensity / 10; // Adjust this logic as needed
      opacity = Math.min(Math.max(opacity, 0.3), 1); // Ensure opacity is between 0.3 and 1
    
      let marker = L.marker([element.lat, element.long], {
        icon: disasterIcons[element.type], // Use the icon corresponding to the element name or default
        opacity: opacity
      }).addTo(map).bindPopup(
        `Name: <strong>${element.Name}</strong> <br> Date: ${element.date} <br> Type: ${element.type} <br> Intensity: ${element.intensity} <br> Location (long, lat): ${element.long}, ${element.lat}`
      );
    
      markers.push({
        Information: element,
        Marker: marker,
      });
    });    
  })
  .catch((error) => console.error("Error:", error));

//initialize the map, use a default position
var map = L.map("map", {
    worldCopyJump: true
}).setView([20, 30], 2);

//use free OpenStreetMap map tiles. This application is not for commercial use.
const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// selects all the checkbox items
document.getElementsByName("options").forEach(function (chk) {
  // adds an event listener to each checkbox
  chk.addEventListener("click", function () {
    // if checkbox is unchecked,
    if (this.checked == false) {
      // check if the markers' types are the same as the checkbox value
      for (let i = 0; i < markers.length; i++) {
        // if they are, remove them from the map
        if (markers[i].Information.type == this.value) {
          map.removeLayer(markers[i].Marker);
        }
      }
      // else, if they are checked,
    } else if (this.checked == true) {
      // check if the markers' types are the same as the checkbox value
      for (let i = 0; i < markers.length; i++) {
        // if they are, add them back to the map
        if (markers[i].Information.type == this.value) {
          map.addLayer(markers[i].Marker);
        }
      }
    }
  });
});

// You can add JavaScript code here for slider functionality or filtering logic if needed
const slider = document.getElementById("sliderValue");
const sliderValueLabel = document.getElementById("sliderValueLabel");

// add an event listener to the slider
slider.addEventListener("input", function () {
  // loop through each disaster and find their intensity level
  for (let i = 0; i < markers.length; i++) {
    // if the markers' disaster level is less than or equal to the value on the slider, display it
    if (markers[i].Information.intensity <= parseInt(this.value)) {
      map.addLayer(markers[i].Marker);
      console.log(markers[i].Information.intensity);
    }

    // if the markers' disaster level is greater than the value on the slider, remove it
    if (markers[i].Information.intensity > parseInt(this.value)) {
      map.removeLayer(markers[i].Marker);
      console.log(markers[i].Information.intensity);
    }
  }
});
