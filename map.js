'use strict';

//nav
const form = document.querySelector('.form');

class App {
  #map;
  #infoWindow;

  constructor() {
    this.map = null;
    this.infoWindow = null;
    this.autocomplete = null;
    this._getPosition();
    this._autoComplete();
  }

  _getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert('Could not get your position');
      });
    }
  };

  _loadMap = position => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    const myLocation = new window.google.maps.LatLng(pos);

    const options = {
      center: myLocation,
      zoom: 13,
      styles: [
        {
          featureType: 'administrative',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#444444',
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            {
              color: '#e0f2ff',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [
            {
              saturation: -100,
            },
            {
              lightness: 45,
            },
            {
              visibility: 'simplified',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [
            {
              visibility: 'simplified',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              color: '#bbd4f0',
            },
            {
              visibility: 'on',
            },
          ],
        },
      ],
    };

    this.map = new window.google.maps.Map(
      document.getElementById('map'),
      options
    );

    const marker = new window.google.maps.Marker({
      position: myLocation,
      map: this.map,
      label: {
        color: '#black',
        fontWeight: 'bold',
        fontSize: '14px',
        text: 'Your Location',
      },
    });
  };

  _autoComplete = () => {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      // autocomplete object/ arguments
      {
        componentRestrictions: { country: 'us' },
        fields: ['geometry', 'name'],
        types: ['establishment'],
      }
    );

    this.autocomplete.addListener(
      'place_changed',
      this._placeSelection.bind(this)
    );
  };

  _placeSelection = () => {
    const place = this.autocomplete.getPlace();
    // creating marker for selected place
    // panning screen to selected place
    if (place.geometry.viewport) {
      this.map.fitBounds(place.geometry.viewport);
    } else {
      this.map.setCenter(place.geometry.location);
    }

    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      title: place.name,
      map: this.map,
      label: {
        color: '#black',
        fontWeight: 'bold',
        fontSize: '14px',
        text: 'Click to Rank',
      },
    });

    marker.addListener('click', () => {
      form.classList.remove('hidden');
      document.getElementById('name').textContent = marker.title;
      document.getElementById('notes').textContent = '';
    });
  };
}
const app = new App();

// setting confirmatuon message
const submit = document.querySelector('.submit');

submit.addEventListener('click', function (e) {
  e.preventDefault;

  alert('Thank you for your rank!');
});

// animated header
const tasty = document.querySelector('.animate-button');
const word = document.querySelector('h1 span');

tasty.addEventListener(
  'click',
  function (e) {
    e.preventDefault;

    // removing the class
    word.classList.remove('animating');
    word.offsetWidth;
    // re-adding the class
    word.classList.add('animating');
  },
  false
);
