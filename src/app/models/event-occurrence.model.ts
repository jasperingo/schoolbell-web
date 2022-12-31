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

export enum EventOccurrenceStatus {
  CANCELLED = 'cancelled',

  ENDED = 'ended',

  ON_GOING = 'on-going',

  NOT_STARTED = 'not-started',
};

export type EventOccurrenceStatusMessages = {
  [EventOccurrenceStatus.CANCELLED]: string;
  [EventOccurrenceStatus.ENDED]: string;
  [EventOccurrenceStatus.ON_GOING]: string;
  [EventOccurrenceStatus.NOT_STARTED]: string;
}
