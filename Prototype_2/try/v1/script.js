function checkLocation() {
  var location = document.getElementById("locationInput").value;

  // Send an AJAX request to check_location.php
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "check_location.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("weatherData").innerHTML = xhr.responseText;
    }
  };
  xhr.send("location=" + location);
}
