import type {BookingStatus} from './BookingStatus';

interface Booking {
  id: number;
  bookingDate: string;
  appointmentDate: string;
  customerId: string;
  customerName: string;
  customerImage: string | null;
  workshopId: string;
  workshopName: string;
  workshopAddress: string;
  workshopImage: string | null;
  finalPrice: number;
  status: BookingStatus;
  serviceId: number;
  serviceName: string;
  customerCarId: number;
  customerCarName: string;
  customerCarPlate: string;
  customerCarMake: string;
  customerCarModel: string;
  customerCarYear: number;
  customerCarLogoUrl: string;
  pinCode: string;
}

export type {Booking};
