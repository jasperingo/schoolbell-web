import { User } from './user.model';

export interface Participant {
  createdAt: string;
  host: boolean;
  id: number;
  user: User;
}
