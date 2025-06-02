const map = L.map('map').setView([40.7580, -73.9855], 15);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add marker with popup
  L.marker([40.7580, -73.9855])
    .addTo(map)
    .bindPopup('<strong>Papi’s Cocina</strong><br>123 Fictional Ave, NYC')
    .openPopup();