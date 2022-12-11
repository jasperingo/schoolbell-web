import { EventOccurrence } from './event-occurrence.model';
import { Participant } from './participant.model';

export interface Event {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  participants: Participant[];
  eventOccurrences: EventOccurrence[];
}
