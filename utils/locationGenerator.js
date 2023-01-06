
module.exports = function generateGeolocations() {
  const geolocations = [];
  
  for (let i = 0; i < 1000; i++) {
    // Generate a random geolocation pair
    const latitude = Math.abs(Math.random() * 180 - 90);
    const longitude = Math.abs(Math.random() * 360 - 180);
    geolocations.push({location: [latitude, longitude]});
  }
  
  return geolocations;
}
