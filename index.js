const express = require('express');
const cors = require('cors');
const Datastore = require('nedb');
const fetch=require('node-fetch');
require('dotenv').config();
// console.log(process.env);
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Starting server at ${port}`)});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();


const database_country = new Datastore('database_country.db');
database_country.loadDatabase();

const database_post_code = new Datastore('database_post_code.db');
database_post_code.loadDatabase();

const database_latlon = new Datastore('database_latlon.db');
database_latlon.loadDatabase();
//start of forecast database
const database_forecast = new Datastore('database_forecast.db');
database_forecast.loadDatabase();

const database_country_forecast = new Datastore('database_country_forecast.db');
database_country_forecast.loadDatabase();

const database_post_code_forecast = new Datastore('database_post_code_forecast.db');
database_post_code_forecast.loadDatabase();

const database_latlon_forecast = new Datastore('database_latlon_forecast.db');
database_latlon_forecast.loadDatabase();

//end of forecast database

app.get('/api',  (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});
app.get('/api_country',  (request, response) => {
  database_country.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});

app.get('/api_postal_code',  (request, response) => {
  database_post_code.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});

app.get('/api_latlon',  (request, response) => {
  database_latlon.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});
//FORECAST

app.get('/api_forecast',  (request, response) => {
  database_forecast.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});
app.get('/api_country_forecast',  (request, response) => {
  database_country_forecast.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});

app.get('/api_postal_code_forecast',  (request, response) => {
  database_post_code_forecast.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});

app.get('/api_latlon_forecast',  (request, response) => {
  database_latlon_forecast.find({}, (err, data) => {
    if (err) {
      response.status(404).json(err);
      return;
    }
    response.json(data);
  });
});
//END  OF FORECAST


app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
app.post('/api_country', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_country.insert(data);
  response.json(data);
});
app.post('/api_postal_code', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_post_code.insert(data);
  response.json(data);
});


app.post('/api_latlon', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_latlon.insert(data);
  response.json(data);
});

//start of forcast

app.post('/api_forecast', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_forecast.insert(data);
  response.json(data);
});
app.post('/api_country_forecast', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_country_forecast.insert(data);
  response.json(data);
});
app.post('/api_postal_code_forecast', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_post_code_forecast.insert(data);
  response.json(data);
});


app.post('/api_latlon_forecast', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database_latlon_forecast.insert(data);
  response.json(data);
});

//end of forecast

app.get('/weather/:latlon',async (request, response) => {
 const latlon =  request.params.latlon.split(',');
 console.log(latlon);
 const lat=latlon[0];
 const lon =latlon[1];
 console.log(lat,lon);
   // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
   const api_key=process.env.API_KEY;
   const weather_url=`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${api_key}`;
          const weather_response = await fetch(weather_url);
          const weather_data=await weather_response.json();

          //const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
          const aq_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=7516fea019af428ab858750f84f8ea1d`;
          const aq_response = await fetch(aq_url);
          const aq_data=await aq_response.json();
          const data={
            weather:weather_data,
            air_quality:aq_data
          };
          response.json(data);
});


app.get('/weather1/:country',async (request, response) => {
  console.time('spi');
  const country =  request.params.country.split(',');
  console.log(country);
  // city,country;
  // const lat=latlon[0];
  // const lon =latlon[1];
  // console.log(lat,lon);
    // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
    const api_key=process.env.API_KEY;
    
    const weather_url=`https://api.weatherbit.io/v2.0/current/airquality?&city=${country[0]}&key=7516fea019af428ab858750f84f8ea1d`;
           const weather_response = await fetch(weather_url);
          const weather_data=await weather_response.json();
          const data={
            weather:weather_data,
          };
            
          //  const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
          //  const aq_response = await fetch(aq_url);
          //  const aq_data=await aq_response.json();
          //  const data={
          //    weather:weather_data,
          //    air_quality:aq_data
          //  };
          console.timeEnd('spi');
          // console.log(weather_data);
           response.json( data );
 });

 
app.get('/weather2/:postal_code',async (request, response) => {
  console.time('spi');
  const postal_code =  request.params.postal_code.split(',');
  console.log(postal_code);
  // city,country;
  // const lat=latlon[0];
  // const lon =latlon[1];
  // console.log(lat,lon);
    // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
    const api_key=process.env.API_KEY;
    
    const weather_url=`https://api.weatherbit.io/v2.0/current/airquality?&postal_code=${postal_code[0]}&key=7516fea019af428ab858750f84f8ea1d`;
           const weather_response = await fetch(weather_url);
          const weather_data=await weather_response.json();
          const data={
            weather:weather_data,
          };
            
          //  const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
          //  const aq_response = await fetch(aq_url);
          //  const aq_data=await aq_response.json();
          //  const data={
          //    weather:weather_data,
          //    air_quality:aq_data
          //  };
          console.timeEnd('spi');
          // console.log(weather_data);
           response.json( data );
 });

 app.get('/weather3/:lat',async (request, response) => {
  console.time('spi');
//   const latlon =  request.params.latlon.split(',');
// //   const lat=latlon[0];
// //  const lon =latlon[1];
//   console.log(latlon);
//   // city,country;
//   const lat=latlon[0];
//   const lon =latlon[1];
//   console.log(lat,lon);
console.log('hi');
const latlon =  request.params.lat.split(',');
 console.log('bye');
 const lat=latlon[0];
 const lon =latlon[1];
 console.log(lat,lon);
    // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
    const api_key=process.env.API_KEY;
    
    const weather_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=7516fea019af428ab858750f84f8ea1d`;
           const weather_response = await fetch(weather_url);
          const weather_data=await weather_response.json();
          const data={
            weather:weather_data,
          };
            
          //  const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
          //  const aq_response = await fetch(aq_url);
          //  const aq_data=await aq_response.json();
          //  const data={
          //    weather:weather_data,
          //    air_quality:aq_data
          //  };
          console.timeEnd('spi');
          // console.log(weather_data);
           response.json( data );
 });
//start of forecast
app.get('/weather/:latlon_forecast',async (request, response) => {
  const latlon =  request.params.latlon.split(',');
  console.log(latlon);
  const lat=latlon[0];
  const lon =latlon[1];
  console.log(lat,lon);
    // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
    const api_key=process.env.API_KEY;
    const weather_url=`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${api_key}`;
           const weather_response = await fetch(weather_url);
           const weather_data=await weather_response.json();
 
           //const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
           const aq_url=`https://api.weatherbit.io/v2.0/forecast/airquality?lat=${lat}&lon=${lon}&key=7516fea019af428ab858750f84f8ea1d`;
           const aq_response = await fetch(aq_url);
           const aq_data=await aq_response.json();
           const data={
             weather:weather_data,
             air_quality:aq_data
           };
           response.json(data);
 });
 
 
 app.get('/weather1/:country_forecast',async (request, response) => {
   console.time('spi');
   const country =  request.params.country.split(',');
   console.log(country);
   // city,country;
   // const lat=latlon[0];
   // const lon =latlon[1];
   // console.log(lat,lon);
     // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
     const api_key=process.env.API_KEY;
     
     const weather_url=`https://api.weatherbit.io/v2.0/forecast/airquality?&city=${country[0]}&key=7516fea019af428ab858750f84f8ea1d`;
            const weather_response = await fetch(weather_url);
           const weather_data=await weather_response.json();
           const data={
             weather:weather_data,
           };
             
           //  const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
           //  const aq_response = await fetch(aq_url);
           //  const aq_data=await aq_response.json();
           //  const data={
           //    weather:weather_data,
           //    air_quality:aq_data
           //  };
           console.timeEnd('spi');
           // console.log(weather_data);
            response.json( data );
  });
 
  
 app.get('/weather2/:postal_code_forecast',async (request, response) => {
   console.time('spi');
   const postal_code=  request.params.postal_code.split(',');
   console.log(postal_code);
   // city,country;
   // const lat=latlon[0];
   // const lon =latlon[1];
   // console.log(lat,lon);
     // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
     const api_key=process.env.API_KEY;
     
     const weather_url=`https://api.weatherbit.io/v2.0/forecast/airquality?&postal_code=${postal_code[0]}&key=7516fea019af428ab858750f84f8ea1d`;
            const weather_response = await fetch(weather_url);
           const weather_data=await weather_response.json();
           const data={
             weather:weather_data,
           };
             
           //  const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
           //  const aq_response = await fetch(aq_url);
           //  const aq_data=await aq_response.json();
           //  const data={
           //    weather:weather_data,
           //    air_quality:aq_data
           //  };
           console.timeEnd('spi');
           // console.log(weather_data);
            response.json( data );
  });
 
  app.get('/weather3/:lat_forecast',async (request, response) => {
   console.time('spi');
 //   const latlon =  request.params.latlon.split(',');
 // //   const lat=latlon[0];
 // //  const lon =latlon[1];
 //   console.log(latlon);
 //   // city,country;
 //   const lat=latlon[0];
 //   const lon =latlon[1];
 //   console.log(lat,lon);
 console.log('hi');
 const latlon =  request.params.lat.split(',');
  console.log('bye');
  const lat=latlon[0];
  const lon =latlon[1];
  console.log(lat,lon);
     // const api_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=c39e8bc08f7f42769ff7af360eb0cfd7`;
     const api_key=process.env.API_KEY;
     
     const weather_url=`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=7516fea019af428ab858750f84f8ea1d`;
            const weather_response = await fetch(weather_url);
           const weather_data=await weather_response.json();
           const data={
             weather:weather_data,
           };
             
           //  const aq_url=`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
           //  const aq_response = await fetch(aq_url);
           //  const aq_data=await aq_response.json();
           //  const data={
           //    weather:weather_data,
           //    air_quality:aq_data
           //  };
           console.timeEnd('spi');
           // console.log(weather_data);
            response.json( data );
  });
 
//end of forecast