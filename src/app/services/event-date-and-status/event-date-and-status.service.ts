import { Injectable } from '@angular/core';
import { EventOccurrence, EventOccurrenceStatus } from 'src/app/models/event-occurrence.model';

@Injectable({
  providedIn: 'root'
})
export class EventDateAndStatusService {

  constructor() { }
  
  get statusColors() {
    return {
      [EventOccurrenceStatus.CANCELLED]: 'bg-red-200',
      [EventOccurrenceStatus.NOT_STARTED]: 'bg-orange-200',
      [EventOccurrenceStatus.ENDED]: 'bg-blue-200',
      [EventOccurrenceStatus.ON_GOING]: 'bg-green-200',
    };
  }

  getStatus(occurrence: EventOccurrence) {
    const endDate = this.getEndDate(occurrence);

    const startDate = this.getStartDate(occurrence);

    return (occurrence.cancelledAt)
      ? EventOccurrenceStatus.CANCELLED
      : (endDate.getTime() <= Date.now()) 
        ? EventOccurrenceStatus.ENDED
        : (startDate.getTime() < Date.now() && endDate.getTime() > Date.now())
          ? EventOccurrenceStatus.ON_GOING
          : EventOccurrenceStatus.NOT_STARTED;
  }

  getDateString(date: Date) {
    return date.toLocaleDateString('en-us', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
    });
  }

  getTimeString(date: Date) {
    return date.toLocaleTimeString('en-us', {
      hour: 'numeric', 
      minute: 'numeric',
    });
  }

  getStartDate(occurrence: EventOccurrence) {
    return new Date(occurrence.startedAt);
  }

  getEndDate(occurrence: EventOccurrence) {
    const endDate = new Date(occurrence.startedAt);

    endDate.setMinutes(endDate.getMinutes() + occurrence.duration);

    return endDate;
  }

  getCancelDate(occurrence: EventOccurrence) {
    return new Date(occurrence.cancelledAt ?? '');
  }

  getStartDateString(occurrence: EventOccurrence) {
    const startDate = this.getStartDate(occurrence);
    return this.getDateString(startDate);
  }

  getEndDateString(occurrence: EventOccurrence) {
    const endDate = this.getEndDate(occurrence);
    return this.getDateString(endDate);
  }

  getCancelDateString(occurrence: EventOccurrence) {
    const cancelDate = this.getCancelDate(occurrence);
    return this.getDateString(cancelDate);
  }

  getStartTimeString(occurrence: EventOccurrence) {
    const startDate = this.getStartDate(occurrence);
    return this.getTimeString(startDate);
  }

  getEndTimeString(occurrence: EventOccurrence) {
    const endDate = this.getEndDate(occurrence);
    return this.getTimeString(endDate);
  }

  getCancelTimeString(occurrence: EventOccurrence) {
    const cancelDate =  this.getCancelDate(occurrence);
    return this.getTimeString(cancelDate);
  }
}
