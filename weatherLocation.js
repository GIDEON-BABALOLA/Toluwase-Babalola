// main.js

const https = require("https");
const express = require("express");
const app = express();

const date = require("./date"); // Assuming you have a separate file for date-related functions

app.get("/blog", function (req, res) {
  const ipLookupURL = "https://extreme-ip-lookup.com/json/?key=0pc1u7KQdIKKkIH4H7sT";

  // Create a promise for the IP lookup request
  const ipLookupPromise = new Promise((resolve, reject) => {
    https.get(ipLookupURL, function (response) {
      let rawData = "";
      response.on("data", function (chunk) {
        rawData += chunk;
      });

      response.on("end", function () {
        const output = JSON.parse(rawData);
        const cityName = output.city;
        resolve(cityName);
      });

      response.on("error", function (error) {
        reject(error);
      });
    });
  });

  // Now, use the IP lookup promise to fetch weather data
  ipLookupPromise
    .then(cityName => {
      const weatherURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=b73e7bf90d8af7e7d7daf9e3be29a174&units=metric";

      // Create a promise for the weather request
      const weatherPromise = new Promise((resolve, reject) => {
        https.get(weatherURL, function (response) {
          let rawData = "";
          response.on("data", function (chunk) {
            rawData += chunk;
          });

          response.on("end", function () {
            const result = JSON.parse(rawData);
            const temp = result.main.temp;
            resolve(temp);
          });

          response.on("error", function (error) {
            reject(error);
          });
        });
      });

      // Now, use the weather promise to render the "blog" view page
      weatherPromise
        .then(temp => {
          // Now you have the temperature value (temp) for the city
          console.log(`Temperature: ${temp}°C`);

          // Render the "blog" view page with temperature data and other data
          res.render("blog", {
            dataman: date.universalDate(),
            firstT: firstTitle,
            firstC: firstContent,
            secondT: secondTitle,
            secondC: secondContent,
            thirdT: thirdTitle,
            thirdC: thirdContent,
            content: newBlog,
            blogComment: commentContainer,
            temperature: temp, // Add the temperature data to the rendered view
          });
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          // Render the "blog" view page without temperature data (optional error handling)
          res.render("blog", {
            dataman: date.universalDate(),
            firstT: firstTitle,
            firstC: firstContent,
            secondT: secondTitle,
            secondC: secondContent,
            thirdT: thirdTitle,
            thirdC: thirdContent,
            content: newBlog,
            blogComment: commentContainer,
            temperature: null, // Set temperature data to null or any default value
          });
        });
    })
    .catch(error => {
      console.error("Error fetching city data:", error);
      // Render the "blog" view page without temperature data (optional error handling)
      res.render("blog", {
        dataman: date.universalDate(),
        firstT: firstTitle,
        firstC: firstContent,
        secondT: secondTitle,
        secondC: secondContent,
        thirdT: thirdTitle,
        thirdC: thirdContent,
        content: newBlog,
        blogComment: commentContainer,
        temperature: null, // Set temperature data to null or any default value
      });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
