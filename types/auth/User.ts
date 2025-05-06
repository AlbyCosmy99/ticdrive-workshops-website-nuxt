import type {UserImage} from '../UserImage';

export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  images: UserImage[];
  emailConfirmed?: boolean;
}
