/*
James Fowler
ICT 4510 Spring Quarter 2025
Description:
This script initializes a Leaflet.js map centered on specific coordinates in Denver, CO.
- Creates a map instance targeting the HTML element with the ID "map" and sets the initial view 
  to a latitude/longitude location with a high zoom level for close-up detail.

- Adds an OpenStreetMap tile layer to display the base map with proper attribution.

- Places a marker at the same coordinates with a popup showing the restaurant name 
  "Papi Grande Cocina" and its location.
  
This script is used to visually represent the restaurant's location on the public-facing site.
*/


const map = L.map('map').setView([39.678380, -104.961753], 19);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add marker with popup
  L.marker([39.678380, -104.961753])
    .addTo(map)
    .bindPopup('Papi Grande Cocina<br>Denver, CO')
    .openPopup();