import type {AxiosInstance} from 'axios';
import type {BookingStatus} from '~/types/bookings/BookingStatus';

export const updateBookingStatusAsync = async (
  bookingId: number,
  newStatus: BookingStatus,
  axios: AxiosInstance,
) => {
  const response = await axios.post('/bookings/update-status', {
    bookingId,
    newStatus,
  });
  return response.data;
};
