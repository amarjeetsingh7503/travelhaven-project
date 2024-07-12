let map = L.map("map").setView(
  [coordinates.latitude, coordinates.longitude],
  10
);
L.tileLayer(
  `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${mapToken}`,
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    crossOrigin: true,
  }
).addTo(map);

let marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);
let circle = L.circle([coordinates.latitude, coordinates.longitude], {
  color: "red",
  fillColor: "red",
  opacity: 0.2,
  radius: 15000,
}).addTo(map);
marker.bindPopup("Location!").openPopup();
