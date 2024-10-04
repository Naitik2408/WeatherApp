  // Function to reverse geocode coordinates (you need to implement this)
  const reverseGeocode = async (lat, lon) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
    );
    const data = await response.json();
    console.log("this is data: ",data)
    return data.results[0].components.state_district; // Adjust based on API response
  };

// Function to get the user's location and fetch weather data
const fetchWeatherForCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await reverseGeocode(latitude, longitude);
          resolve(city);
        }, (error) => reject(error));
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  
  

  
  // Call the function when the app loads
//   useEffect(() => {
//     fetchWeatherForCurrentLocation();
//   }, []);


export default fetchWeatherForCurrentLocation;