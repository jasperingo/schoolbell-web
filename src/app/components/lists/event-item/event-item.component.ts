import { Component, Input } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { CreateAvatarService } from 'src/app/services/create-avatar/create-avatar.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent {
  @Input() item!: Event;

  avatarColor = '';

  constructor(private readonly createAvatarService: CreateAvatarService) {
    this.avatarColor = this.createAvatarService.getColor();
  }

  get status() {
    if (this.item.eventOccurrences.length === 0) {
      return 'not-started';
    }

    const occurrence = this.item.eventOccurrences[0];

    if (occurrence.cancelledAt) {
      return 'cancelled';
    }

    const startDate = new Date(occurrence.startedAt);

    startDate.setMinutes(startDate.getMinutes() + occurrence.duration);

    return (startDate.getTime() <= Date.now()) 
      ? 'ended'
      : 'on-going';
  }

  get occurrenceStartDate() {
    return new Date(this.item.eventOccurrences[0].startedAt).toLocaleString();
  }
}
