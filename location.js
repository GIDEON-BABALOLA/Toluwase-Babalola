const https = require("https");
 const url = "https://extreme-ip-lookup.com/json/?key=0pc1u7KQdIKKkIH4H7sT"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const output = JSON.parse(data);
      console.log(output)
      const cityName = output.city;
    })
  })
  const urlo = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=b73e7bf90d8af7e7d7daf9e3be29a174&units=metric";
  https.get(urlo, function(res)
  {
   console.log(res.statusCode);
   res.on("data", function(data){
      // The result gets printed as hexadecimal so convert with cryptii.com
      console.log(data);
      //To pass our data into javascript object
      const result = JSON.parse(data);
      console.log(result);
      const temp = result.main.temp;
      const speed = result.wind.speed;
      const description =result.weather[0].description;
      const icon = result.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" +icon + "@2x.png";
   })})
   //pls how do i pass the cityName from the first https request to the second https request
   // and how do i export the temp, speed, description, icon, and iconURL to my main module provided that this is a dependent module.