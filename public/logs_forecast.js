const mymap = L.map('mymap').setView([22.805, 82.0], 5);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

var iconcolor;
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
 // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  //shadowSize: [41, 41]
});

  
function AutoRefresh( t ) {
   setTimeout("location.reload(true);", t);
}

async function getData() {
  const response = await fetch('/api_forecast');
  const data = await response.json();

  for (item of data) {
    if ( item.air.aqi >= 301)
      iconcolor = blackIcon
    else if ( item.air.aqi >= 201 &  item.air.aqi <= 300)
      iconcolor = violetIcon;
    else if ( item.air.aqi >= 151 &  item.air.aqi <= 200)
      iconcolor = redIcon;
    else if ( item.air.aqi >= 101 &  item.air.aqi <= 150)
      iconcolor = orangeIcon;
    else if ( item.air.aqi >= 51 &  item.air.aqi <= 100)
      iconcolor = yellowIcon;
    else if ( item.air.aqi <= 50)
          iconcolor = greenIcon;
          const marker = L.marker([ item.lat,  item.lon], {icon:iconcolor}).addTo(mymap);
          let txt = `LAT &nbsp &nbsp : &nbsp  &nbsp&nbsp${  item.lat}  <br>
          LON &nbsp &nbsp: &nbsp &nbsp${  item.lon}  <br>
          AQI &nbsp &nbsp : &nbsp &nbsp &nbsp${  item.air.aqi}  <br>
          O3 &nbsp &nbsp  &nbsp:  &nbsp &nbsp &nbsp  ${  item.air.o3} <br>
          SO2 &nbsp  &nbsp:  &nbsp &nbsp  ${  item.air.so2} <br>
          NO2 &nbsp &nbsp:  &nbsp &nbsp ${  item.air.no2} <br>
          CO &nbsp &nbsp &nbsp:  &nbsp &nbsp &nbsp  ${  item.air.co} <br>
          PM10 &nbsp:  &nbsp  ${  item.air.pm10} <br>
          PM25 &nbsp:  &nbsp  ${  item.air.pm25} <br>`;

    if ( item.air.value < 0) {
      txt += '  No air quality reading.';
    } else {
      txt += `  `;
    }
    marker.bindPopup(txt);
  }
  console.log(data);
}