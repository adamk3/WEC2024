function checkForm() {

  // Get the latitude and longitude input values
  var latInput = document.getElementById("lat");
  var longInput = document.getElementById("long");

// Parse the input values as floats
var lat = parseFloat(latInput.value);
var long = parseFloat(longInput.value);

// Check if the values are within the valid range
if (isNaN(lat) || lat < -90 || lat > 90) {
latInput.style.outline = "2px solid red";
latInput.setCustomValidity("Latitude must be between -90 and 90 degrees");
} else {
latInput.style.outline = ""; // Remove red outline
latInput.setCustomValidity(""); // Reset custom validity message
}

if (isNaN(long) || long < -180 || long > 180) {
longInput.style.outline = "2px solid red";
longInput.setCustomValidity("Longitude must be between -180 and 180 degrees");
} else {
longInput.style.outline = ""; // Remove red outline
longInput.setCustomValidity(""); // Reset custom validity message
}


  const name_value = document.getElementById("name").value;
  const long_value = document.getElementById("long").value;
  const lat_value = document.getElementById("lat").value;
  const intensity_value = document.getElementById("intensity").value;
  const type_value = document.getElementById("type").value;
  const date_value = document.getElementById("date").value;
  console.log(document.getElementById("intensity").value);

  const add_button = document.getElementById("add");

  if (
    name_value.trim() !== "" &&
    long_value.trim() !== "" &&
    lat_value.trim() !== "" &&
    intensity_value.trim() !== "" &&
    latInput.checkValidity() &&  // Check custom validity for latitude
    longInput.checkValidity() && // Check custom validity for longitude
    type_value.trim() !== "" &&
    date_value.trim() !== ""
  ) {
    add_button.removeAttribute("disabled");
  } else {
    add_button.setAttribute("disabled", "disabled");
  }
}