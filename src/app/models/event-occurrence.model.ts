import { Event } from "./event.model";

export interface EventOccurrence {
  createdAt: string;
  description: string;
  duration: number;
  id: number;
  link: string;
  startedAt: string;
  cancelledAt: string;
  address: string;
  event: Event;
  venue: 'virtual' | 'physical';
}
