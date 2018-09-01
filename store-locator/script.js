// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

var stores = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -82.3458757,
                    34.801604
                ]
            },
            "properties": {
                "name": "greenville",
                "phoneFormatted": "(864) 233-7484",
                "phone": "8642337484",
                "address": "280 Rainforest Way",
                "city": "Greenville",
                "country": "United States",
                "postalCode": "29607",
                "state": "SC",
                "storeHours": [
                    {
                        "Monday": "7am - 5pm",
                        "Tuesday": "7am - 5pm",
                        "Wednesday": "7am - 5pm",
                        "Thursday": "7am - 5pm",
                        "Friday": "7am - 5pm",
                        "Saturday": "closed",
                        "Sunday": "closed",
                    }
                ]
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -80.573589,
                    35.376411
                ]
            },
            "properties": {
                "name": "concord",
                "phoneFormatted": "(704) 795-3774",
                "phone": "7047953774",
                "address": "2900 Armentrout Drive",
                "city": "Concord",
                "country": "United States",
                "postalCode": "28025",
                "state": "NC",
                "storeHours": [
                    {
                        "Monday": "7am - 5pm",
                        "Tuesday": "7am - 5pm",
                        "Wednesday": "7am - 5pm",
                        "Thursday": "7am - 5pm",
                        "Friday": "7am - 5pm",
                        "Saturday": "closed",
                        "Sunday": "closed",
                    }
                ]
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -80.06139,
                    32.877932
                ]
            },
            "properties": {
                "name": "charleston",
                "phoneFormatted": "(843) 207-8181",
                "phone": "8432078181",
                "address": "6470 Dorchester Road",
                "city": "North Charleston",
                "country": "United States",
                "postalCode": "29418",
                "state": "SC",
                "storeHours": [
                    {
                        "Monday": "7am - 4:30pm",
                        "Tuesday": "7am - 4:30pm",
                        "Wednesday": "7am - 4:30pm",
                        "Thursday": "7am - 4:30pm",
                        "Friday": "7am - 4:30pm",
                        "Saturday": "closed",
                        "Sunday": "closed",
                    }
                ]
            }
        }
    ]
};

var mapOptions = {
    // container id specified in the HTML
    container: 'map',
    // style URL
    style: 'mapbox://styles/kmarshall/cjjyeb8g720tx2rrsvij1w3f5',
    // initial position in [lon, lat] format
    center: [-80.713703, 34.394260],
    // initial zoom
    zoom: 6
};

mapboxgl.accessToken = 'pk.eyJ1Ijoia21hcnNoYWxsIiwiYSI6ImNqanIzMzVicjBsc2Uzd3A0cTVueWhhZTkifQ.khEKqcO-hx2Fta7Ny8Fsyw';
// This adds the map to your page
var map = new mapboxgl.Map(mapOptions);

map.on('load', function (e) {
    // Add the data to your map as a layer
    map.addSource('places', {
        type: 'geojson',
        data: stores
    });
    buildLocationList(stores);
});

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 16
    });
}

function resetMap() {
    resetHighlightItems();
    resetActiveItems();
    removePopups();
    map.flyTo({
        center: [-80.713703, 34.394260],
        zoom: 6
    })
}

function resetHighlightItems() {
    var highlightItem = document.getElementsByClassName('highlight');
    if (highlightItem[0]) {
        highlightItem[0].classList.remove('highlight');
    }
}

function resetActiveItems() {
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
        activeItem[0].classList.remove('active');
    }
}

function removePopups() {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // remove any exisiting popups
    if (popUps[0]) popUps[0].remove();
}

function createPopUp(currentFeature) {
    removePopups();

    var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`
            <h3>Atlantic Coast Electric Supply</h3>
            <address>
                <span>${currentFeature.properties.address}</span>
                <span>${currentFeature.properties.city}, ${currentFeature.properties.state}</span>
            </address>`)
        .addTo(map);
}

function buildLocationList(data) {
    // Iterate through the list of stores
    for (i = 0; i < data.features.length; i++) {
        var currentFeature = data.features[i];
        // Shorten data.feature.properties to just `prop` so we're not
        // writing this long form over and over again.
        var prop = currentFeature.properties;
        // Select the listing container in the HTML and append a div
        // with the class 'item' for each store
        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';
        listing.classList.add(prop.name);
        listing.id = 'listing-' + i;

        // Create a new link with the class 'title' for each store
        // and fill it with the store address
        var title = listing.appendChild(document.createElement('h2'));
        title.className = 'title';
        listing.dataPosition = i;
        title.innerHTML = prop.city;

        // Create a new div with the class 'details' for each store
        // and fill it with the city and phone number
        var address = listing.appendChild(document.createElement('address'));
        address.classList.add('list-address');
        address.innerHTML = prop.address;
        address.appendChild(document.createElement('br'));
        address.innerHTML += prop.city + ', ' + prop.state;
        address.appendChild(document.createElement('br'));
        if (prop.phone) {
            address.innerHTML += prop.phoneFormatted;
        }

        // Add an event listener for the links in the sidebar listing
        listing.addEventListener('click', function (e) {
            // Update the currentFeature to the store associated with the clicked link
            var clickedListing = data.features[this.dataPosition];
            // 1. Fly to the point associated with the clicked link
            flyToStore(clickedListing);
            // 2. Close all other popups and display popup for clicked store
            createPopUp(clickedListing);
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            resetHighlightItems();
            resetActiveItems();
            this.classList.add('highlight', 'active');
        });

    }
}


stores.features.forEach(function (marker, i) {
    // Create a div element for the marker
    var el = document.createElement('div');
    // Add a class called 'marker' to each div
    el.addEventListener('click', function (e) {
        // 1. Fly to the point
        flyToStore(marker);
        // 2. Close all other popups and display popup for clicked store
        createPopUp(marker);
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        e.stopPropagation();
        resetHighlightItems();
        resetActiveItems();
        var listing = document.getElementById('listing-' + i);
        listing.classList.add('highlight', 'active');
    });

    el.addEventListener('mouseover', function (e) {
        createPopUp(marker);
        e.stopPropagation();
        resetHighlightItems();
        var listing = document.getElementById('listing-' + i);
        listing.classList.add('highlight');
    });

    el.addEventListener('mouseout', function (e) {
        removePopups();
        resetHighlightItems();
    });

    el.className = 'marker';
    // By default the image for your custom marker will be anchored
    // by its center. Adjust the position accordingly
    // Create the custom markers, set their position, and add to map
    new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});