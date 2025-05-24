import type {Address} from '../localization/Address';
import type {UserImage} from '../UserImage';

export interface User {
  id: string;
  name: string;
  email: string;
  address?: Address | string;
  phoneNumber?: string;
  images?: UserImage[];
  emailConfirmed?: boolean;
}
