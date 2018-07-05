var birdData = [];
var birdDropdown = [];
var selectedBird = setBird();
var counties = [];
var map;
var $select = document.querySelector(".bird-dropdown");
var $legend = document.querySelector(".legend");

function setBird(bird = "Blackbird") {
  setBackgroundImage(bird);
  return (selectedBird = bird);
}

fetch("data/birddata.json")
  .then(resp => resp.json())
  .then(function(data) {
    return data.map(function(item) {
      birdData.push(item);
      if (counties.indexOf(item.County) === -1) {
        counties.push(item.County);
      }
      if (
        birdDropdown.indexOf(item.Species) === -1 &&
        item.percent_gardens_2018 > 40
      ) {
        birdDropdown.push(item.Species);
      }
    });
  })
  .then(function() {
    birdDropdown.sort().map(bird => {
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(bird));
      $select.appendChild(option);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

$select.addEventListener("change", function() {
  setBird($select.value);
  setMapStyles(map);
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 56.0053834, lng: -2.5742888 },
    disableDefaultUI: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  });
  map.data.loadGeoJson("data/counties.json");
  setMapStyles(map);
  document.querySelector(".loader").classList.remove("is-paused");
}

function setColor(percent) {
  if (percent > 95) {
    return (color = "#990100");
  } else if (percent > 90) {
    return (color = "#cc0001");
  } else if (percent > 85) {
    return (color = "#fe0000");
  } else if (percent > 80) {
    return (color = "#ff3300");
  } else if (percent > 75) {
    return (color = "#ff6600");
  } else if (percent > 70) {
    return (color = "#fe9900");
  } else if (percent > 65) {
    return (color = "#ffcc00");
  } else if (percent > 60) {
    return (color = "#fffc00");
  } else if (percent > 55) {
    return (color = "#cbfe33");
  } else if (percent > 50) {
    return (color = "#98ff66");
  } else if (percent > 45) {
    return (color = "#67ff9a");
  } else if (percent > 40) {
    return (color = "#33ffcc");
  } else if (percent > 35) {
    return (color = "#00ffff");
  } else if (percent > 30) {
    return (color = "#00ccff");
  } else if (percent > 25) {
    return (color = "#0099ff");
  } else if (percent > 20) {
    return (color = "#0166ff");
  } else if (percent > 15) {
    return (color = "#0000fe");
  } else if (percent > 10) {
    return (color = "#0033ff");
  } else if (percent > 5) {
    return (color = "#0000cc");
  } else {
    return (color = "#000098");
  }
}

function setBackgroundImage(species) {
  var string = species.replace(/\s+/g, "-").toLowerCase();
  document.querySelector(".legend").classList.add("box-shadow");
  document.querySelector(".legend").style.background =
    "url('images/" + string + ".png') no-repeat top";
}

function setMapStyles(map) {
  map.data.setStyle(feature => {
    var name = feature.getProperty("name");
    var color = "";
    birdData.map(bird => {
      if (bird.Species === selectedBird && bird.County === name) {
        feature.setProperty("bird", bird);
        color = setColor(bird.percent_gardens_2018);
      }
    });
    return {
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: "#000",
      strokeOpacity: 0.2,
      strokeWeight: 1
    };
  });
  map.data.addListener("mouseover", function(event) {
    map.data.revertStyle();
    $legend.innerHTML = "";
    map.data.overrideStyle(event.feature, { fillOpacity: 1.0 });
    var heading = document.createElement("h1");
    var subheading = document.createElement("p");
    var span = document.createElement("span");
    heading.style.borderLeftColor = setColor(
      event.feature.f.bird.percent_gardens_2018
    );
    span.appendChild(
      document.createTextNode(event.feature.f.bird.percent_gardens_2018 + "%")
    );
    subheading.appendChild(span);
    subheading.appendChild(document.createTextNode(" of gardens 2018"));
    heading.appendChild(document.createTextNode(event.feature.f.name));
    $legend.appendChild(heading);
    $legend.appendChild(subheading);
  });
  map.data.addListener("mouseout", function() {
    map.data.revertStyle();
    $legend.innerHTML = "";
  });
}
