import { Component, Input } from '@angular/core';
import { EventOccurrenceStatus, EventOccurrenceStatusMessages } from 'src/app/models/event-occurrence.model';
import { Event } from 'src/app/models/event.model';
import { CreateAvatarService } from 'src/app/services/create-avatar/create-avatar.service';
import { EventDateAndStatusService } from 'src/app/services/event-date-and-status/event-date-and-status.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent {
  @Input() item!: Event;

  avatarColor = '';

  constructor(
    private readonly createAvatarService: CreateAvatarService,
    private readonly eventDateAndStatusService: EventDateAndStatusService,
  ) {
    this.avatarColor = this.createAvatarService.getColor();
  }

  get status() {
    if (this.item.eventOccurrences.length === 0) {
      return EventOccurrenceStatus.NOT_STARTED;
    }

    const occurrence = this.item.eventOccurrences[0];

    if (occurrence.cancelledAt) {
      return EventOccurrenceStatus.CANCELLED;
    }

    return (this.eventDateAndStatusService.getEndDate(occurrence).getTime() <= Date.now()) 
      ? EventOccurrenceStatus.ENDED
      : EventOccurrenceStatus.ON_GOING;
  }

  get occurrenceStartDate() {
    return this.item?.eventOccurrences[0] 
      ? this.eventDateAndStatusService.getStartDateString(this.item.eventOccurrences[0])
      : '';
  }

  get statusTexts(): EventOccurrenceStatusMessages {
    return {
      ended: 'Next occurrence has ended',
      'not-started': 'Event has not started',
      cancelled: 'Next occurrence is cancelled',
      'on-going': `Next occurrence starts by: ${this.occurrenceStartDate}`,
    }
  }
}
