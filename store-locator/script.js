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
                "imageSrc": "images/greenville.png",
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
                    -81.065203,
                    33.967728
                ]
            },
            "properties": {
                "name": "cayce",
                "imageSrc": "images/cayce.png",
                "phoneFormatted": "(803) 999-1412",
                "phone": "8039991412",
                "address": "1303 Dunbar Road",
                "city": "Cayce",
                "country": "United States",
                "postalCode": "29033",
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
                "imageSrc": "images/concord.png",
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
                "imageSrc": "images/charleston.png",
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
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-80.713703, 34.394260],
    zoom: 6
};

mapboxgl.accessToken = 'pk.eyJ1Ijoia21hcnNoYWxsIiwiYSI6ImNqanIzMzVicjBsc2Uzd3A0cTVueWhhZTkifQ.khEKqcO-hx2Fta7Ny8Fsyw';
// This adds the map to your page
var map = new mapboxgl.Map(mapOptions);

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function (e) {
    // Add the data to your map as a layer
    map.addSource('places', {
        type: 'geojson',
        data: stores
    });
    map.scrollZoom.disable();
    // disable map rotation using right click + drag
    map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    buildLocationList(stores);
    addEventListeners(stores);
});

addEventListeners = (data) => {
    var buttons = document.querySelectorAll('.list-item__button');
    [].forEach.call(buttons, (button) => {
        button.addEventListener('click', (e) => {
            var clickedListing = data.features[e.currentTarget.dataset.position];
            // 1. Fly to the point associated with the clicked link
            // 2. Close all other popups and display popup for clicked store
            createPopUp(clickedListing);
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            resetHighlightItems();
            resetActiveItems();
            document.querySelector('[data-item="' + e.currentTarget.dataset.position + '"]').classList.add('highlight', 'active');
        });

        button.addEventListener('mouseenter', (e) => {
            e.currentTarget.classList.add('highlight');
        });

        button.addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove('highlight');
        });
    });
}

resetMap = () => {
    resetHighlightItems();
    resetActiveItems();
    removePopups();
    map.flyTo({
        center: [-80.713703, 34.394260],
        zoom: 6
    })
}

resetHighlightItems = () => {
    var highlightItems = document.querySelectorAll('.highlight');
    [].forEach.call(highlightItems, (item) => {
        item.classList.remove('highlight');
    })
}

resetActiveItems = () => {
    var activeItems = document.querySelectorAll('.active');
    [].forEach.call(activeItems, (item) => {
        item.classList.remove('active');
    })
}

removePopups = () => {
    var popUps = document.querySelectorAll('.mapboxgl-popup');
    [].forEach.call(popUps, (item) => {
        item.remove();
    })
}

createPopUp = (currentFeature) => {
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

buildLocationList = (data) => {
    data.features.map((feature, index) => {
        var storeHoursMarkup = "";
        feature.properties.storeHours.forEach((weekday) => {
            Object.entries(weekday).forEach(
                ([day, hours]) => {
                    storeHoursMarkup += '<dt>' + day + '</dt><dd>' + hours + '</dd>'
                }
            );
        });

        var listMarkup = `
            <li class="list-item" data-item="${index}">
                <h2>
                    <button 
                        class="list-item__button" 
                        data-position="${index}">
                        ${feature.properties.city}
                    </button>
                </h2>
                <div class="details">
                    <figure class="image-container">
                        <img src="${feature.properties.imageSrc}" alt="${feature.properties.city} store" />
                    </figure>
                    <div class="details-body">
                        <address class="list-address">
                            <span>${feature.properties.address}</span>
                            <span>${feature.properties.city}, ${feature.properties.state}</span>
                            <span>${feature.properties.phoneFormatted}</span>
                        </address>
                        <h3>Store Hours</h3>
                        <dl class="store-hours">
                            ${storeHoursMarkup}
                        </dl>
                    </div>
                </div>
            </li>
        `;
        document.getElementById('listings').innerHTML += listMarkup;
    })
}


stores.features.forEach((marker, index) => {
    var button = document.createElement('button');

    button.addEventListener('click', (e) => {
        createPopUp(marker);
        e.stopPropagation();
        resetHighlightItems();
        resetActiveItems();
        var listing = document.querySelector('[data-item="' + index + '"]');
        listing.classList.add('highlight', 'active');
    });

    button.addEventListener('mouseenter', (e) => {
        createPopUp(marker);
        e.stopPropagation();
        resetHighlightItems();
        var listing = document.querySelector('[data-item="' + index + '"]');
        listing.classList.add('highlight');
        e.currentTarget.classList.add('highlight');
    });

    button.addEventListener('mouseleave', (e) => {
        removePopups();
        resetHighlightItems();
    });

    button.className = 'marker';
    button.classList.add('marker-' + index);

    new mapboxgl.Marker(button, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});