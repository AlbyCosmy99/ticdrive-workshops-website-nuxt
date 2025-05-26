import axios from 'axios';

const getCoordinates = async (address: string) => {
  return {lat: 100, lng: 100};
  // const apiKey = 'AIzaSyA4RElAzKK4A46CGKArVpOW5fXoTRLKAso';
  // const encodedAddress = encodeURIComponent(address);
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  // const showToast = useToast();

  // try {
  //   const response = await axios.get(url);
  //   const results = response.data.results;

  //   if (results.length > 0) {
  //     const location = results[0].geometry.location;
  //     return {lat: location.lat, lng: location.lng};
  //   } else {
  //     showToast(
  //       'error',
  //       'Incorrect Address.',
  //       'No results found for the given address. Latitude and longitude not found.',
  //     );
  //   }
  // } catch (error: any) {
  //   showToast('error', 'Geocoding error.', error.message);
  //   return null;
  // }
};

export default getCoordinates;
