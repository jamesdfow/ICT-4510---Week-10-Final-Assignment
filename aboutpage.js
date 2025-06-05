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