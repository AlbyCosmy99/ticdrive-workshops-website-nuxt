import type {AxiosInstance} from 'axios';

const getBookingsAsync = async (axios: AxiosInstance) => {
  return await axios.get('bookings');
};

export default getBookingsAsync;
