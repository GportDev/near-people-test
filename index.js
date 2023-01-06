const generateGeolocations = require('./utils/locationGenerator')

const peopleLocation = generateGeolocations();


function calculateDistance(location1, location2) {
  let lat1 = location1[0];
  let lon1 = location1[1];
  let lat2 = location2[0];
  let lon2 = location2[1];

  let R = 6371; // Earth's radius in kilometers
  let radLat1 = lat1 * Math.PI / 180;
  let radLat2 = lat2 * Math.PI / 180;
  let deltaLat = (lat2 - lat1) * Math.PI / 180;
  let deltaLon = (lon2 - lon1) * Math.PI / 180;

  //Haversine formula - calculate the distance between two points on a sphere
  let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(radLat1) * Math.cos(radLat2) *
          Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;

  return distance;
}

function findClosePoints(points, distance) {
  // Initialize an array to store the close points
  let closePoints = [];

  // Iterate over the points list
  for (let i = 0; i < points.length; i++) {
    let point1 = points[i];
    let location1 = point1.location;

    // Compare the current point with every other point
    for (let j = i + 1; j < points.length; j++) {
      let point2 = points[j];
      let location2 = point2.location;

      // Calculate the distance between the two locations
      let actualDistance = calculateDistance(location1, location2);

      if (actualDistance <= distance) {
        // If the distance is less than or equal to the specified distance, add the points to the closePoints list
        closePoints.push(point1);
        closePoints.push(point2);
      }
    }
  }

  // Iterate over the closePoints list and remove any points who are not within the specified distance of each other
  for (let i = 0; i < closePoints.length; i++) {
    let point1 = closePoints[i];
    let location1 = point1.location;

    for (let j = i + 1; j < closePoints.length; j++) {
      let point2 = closePoints[j];
      let location2 = point2.location;

      // Calculate the distance between the two locations
      let actualDistance = calculateDistance(location1, location2);

      if (actualDistance > distance) {
        // If the point is not within the distance, remove it from the list
        closePoints.splice(j, 1);
        j--;
      }
    }
  }

  // Return the list of close points
  console.log('The points closer than 1km are:',closePoints);
  console.log(`They are ${closePoints.length} points`)
}

let startTime = performance.now();

findClosePoints(peopleLocation , 1000)

let endTime = performance.now();
let elapsedTime = (endTime - startTime) * 0.001;

console.log(`Time taken to execute: ${elapsedTime}s`)