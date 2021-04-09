// const mymap = L.map('mymap').setView([22.805, 82.0], 5);
// const attribution =' <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
// //const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tileUrl =
//   'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=II7uREndG4cP3ocP64ZH';
// const tiles = L.tileLayer(tileUrl, { attribution });
// tiles.addTo(mymap);

// getData();
// async function getData() {
//   const response = await fetch('/api_country');
//   const data = await response.json();
// console.log("check",data);
//   for (item of data) {
//     const marker = L.marker([ weather.lat,  weather.lon]).addTo(mymap);
//     let txt = `The weather here at ${ weather.city_name}&deg;,
//     ${ weather.city_name}&deg; is ${ weather.city_name} with
//     a temperature of ${ weather.city_name}&deg; C.`;

//     // if ( air.value < 0) {
//     //   txt += 'No air quality reading.';
//     // } else {
//     //   txt += `The concentration of particulate matter 
//     // (${ city}) is ${ air.value} 
//     // ${ air.unit} last read on ${ air.lastUpdated}`;
//     // }
//     marker.bindPopup(txt);
//   }

//   console.log(data);
// }

const mymap = L.map('mymap').setView([22.805, 82.0], 5);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();


async function getData() {
  const response = await fetch('/api_country');
  const data = await response.json();
  console.log("check", data);
  // var customColour = "green";
  // var customMarker = L.AwesomeMarkers.icon({
  //     markerColor: customColour
  //     });

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


  // if ( weather.data[0].aqi > 150)
  // iconcolor = redIcon
  // else if ( weather.data[0].aqi > 100 &  weather.data[0].aqi < 150)
  //   iconcolor = yellowIcon;
  // else if ( weather.data[0].aqi < 100)
  //       iconcolor = greenIcon;

  if (weather.data[0].aqi >= 301)
    iconcolor = blackIcon
  else if (weather.data[0].aqi >= 201 & weather.data[0].aqi <= 300)
    iconcolor = violetIcon;
  else if (weather.data[0].aqi >= 151 & weather.data[0].aqi <= 200)
    iconcolor = redIcon;
  else if (weather.data[0].aqi >= 101 & weather.data[0].aqi <= 150)
    iconcolor = orangeIcon;
  else if (weather.data[0].aqi >= 51 & weather.data[0].aqi <= 100)
    iconcolor = yellowIcon;
  else if (weather.data[0].aqi <= 50)
    iconcolor = greenIcon;

  // var markerLocation = new L.LatLng( weather.lat,  weather.lon);
  //const marker = L.marker([ weather.lat,  weather.lon], {icon: customMarker}).addTo(mymap);
  const marker = L.marker([weather.lat, weather.lon], { icon: iconcolor }).addTo(mymap);
  // const marker = L.marker([ weather.lat,  weather.lon]).addTo(mymap);
  let txt = ` City&nbsp&nbsp&nbsp: &nbsp${weather.city_name} <br>
                AQI&nbsp&nbsp&nbsp: &nbsp${weather.data[0].aqi}  <br>
                  O3&nbsp&nbsp&nbsp&nbsp:     &nbsp&nbsp${weather.data[0].o3} <br>
                SO2&nbsp&nbsp: &nbsp${weather.data[0].so2} <br>
                NO2&nbsp&nbsp: &nbsp${weather.data[0].no2} <br>
                CO&nbsp&nbsp&nbsp&nbsp: &nbsp${weather.data[0].co} <br>
                PM25:&nbsp&nbsp${weather.data[0].pm25} <br>
                PM10:&nbsp&nbsp${weather.data[0].pm10} <br>`;

  // if ( air.value < 0) {
  //   txt += 'No air quality reading.';
  // } else {
  //   txt += `The concentration of particulate matter 
  // (${ city}) is ${ air.value} 
  // ${ air.unit} last read on ${ air.lastUpdated}`;
  // }
  marker.bindPopup(txt);

  console.log(data);
}