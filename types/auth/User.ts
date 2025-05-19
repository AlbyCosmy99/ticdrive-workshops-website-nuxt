import type {UserImage} from '../UserImage';

export interface User {
  id: string;
  name: string;
  surname?: string;
  workshopName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  images?: UserImage[];
  emailConfirmed?: boolean;
}
