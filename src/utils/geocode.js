const nodeFetch = require("node-fetch");

const geocode = (address, showInfo) => {
  
  if (!address) {
    console.log("You have to give location");
    return 0;
  } 

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxleHM5OCIsImEiOiJjazdvbzF2N3UwYXlzM2RuMTA4NThxMXV6In0.Ri25weXE160wRHuyDbgfEw`;

  nodeFetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }  else {
          throw new Error 
      }
    }) 
    .then((data) => 
      showInfo(
        {
          lattitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          place: data.features[0].place_name
        }
      )
    )
    .catch((error) => console.log(error))
}

module.exports = geocode;
