const initialCenter = [36.1069, -112.1129];
const initialZoom = 11;

const map = L.map('map').setView(initialCenter, initialZoom);

const terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap'
});

const streetLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
});

terrainLayer.addTo(map);

const grandCanyonMarker = L.marker([36.0544, -112.1401]).addTo(map);
grandCanyonMarker.bindPopup(`
  <strong>Grand Canyon Village</strong><br>
  Main reference point for this project.<br>
  Approximate coordinates: 36.0544, -112.1401
`);

const canyonArea = L.rectangle([
  [36.30, -112.35],
  [35.92, -111.85]
], {
  color: '#cc5500',
  weight: 2,
  fillOpacity: 0.08
}).addTo(map);

canyonArea.bindTooltip('Approximate Grand Canyon exploration area');

L.control.layers(
  {
    'Terrain Map': terrainLayer,
    'Street Map': streetLayer
  },
  {
    'Reference Area': canyonArea,
    'Reference Marker': grandCanyonMarker
  }
).addTo(map);

L.control.scale().addTo(map);

const coordinateBox = document.getElementById('coordinate-box');

map.on('click', function (event) {
  const lat = event.latlng.lat.toFixed(4);
  const lng = event.latlng.lng.toFixed(4);

  coordinateBox.textContent = `Selected coordinates: ${lat}, ${lng}`;

  L.popup()
    .setLatLng(event.latlng)
    .setContent(`<strong>Selected location</strong><br>Latitude: ${lat}<br>Longitude: ${lng}`)
    .openOn(map);
});

document.getElementById('reset-view-btn').addEventListener('click', function () {
  map.setView(initialCenter, initialZoom);
});
