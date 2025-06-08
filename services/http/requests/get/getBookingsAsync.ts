import type {AxiosInstance} from 'axios';
import type {BookingStatus} from '~/types/bookings/BookingStatus';

const getBookingsAsync = async (
  axios: AxiosInstance,
  bookingType?: BookingStatus,
  skip: number = 0,
  take: number = 10,
) => {
  const params: Record<string, any> = {
    skip,
    take,
  };

  if (bookingType !== undefined) {
    params.BookingType = bookingType;
  }

  return await axios.get('bookings', {params});
};

export default getBookingsAsync;
