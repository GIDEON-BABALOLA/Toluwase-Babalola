// cityNameData.js

const cities = ["lagos", "london", "Johannesburg", "Seoul", "Tokyo", "Barcelona", "Amsterdam", "Dallas", "Yokohama", "Stockholm"];

function getRandomCityName() {
  var cityNumber = Math.floor(Math.random() * cities.length);
  var cityName = cities[cityNumber];
  return cityName;
}

module.exports = {
  getRandomCityName,
};
