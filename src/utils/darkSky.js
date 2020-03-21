const nodeFetch = require("node-fetch");

const darkSKy = (latitude, longitude, forecast) => {
  
  const url = `https://api.darksky.net/forecast/32c68d31e08fba996551f8f4d01d938f/${latitude},${longitude}?units=si`;
   
  nodeFetch(url)
    .then((response) => {
      if (response.statusText == "OK") {
        return response.json()
      } else {
        throw new Error;
      }
    })
    .then(data => {
        forecast(
          {
            temperature: data.currently.temperature, 
            precipProb: data.currently.precipProbability
          }
        )
      }
    )
    .catch(error => console.log(error))
}

module.exports = darkSKy;
