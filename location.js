const https = require("https");
const array = []
 const url = "https://extreme-ip-lookup.com/json/?key=0pc1u7KQdIKKkIH4H7sT"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const output = JSON.parse(data);
      console.log(output)
      const cityName = output.city;
      array.unshift(cityName);
    })
  })
 console.log(array[0]);
  