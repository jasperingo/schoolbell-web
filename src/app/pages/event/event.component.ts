import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appIcons } from 'src/app/app-icons';
import { Event } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-event-nav-button',
  template: `
    <li>
      <button
        (click)="onAction()" 
        class="block p-4 text-center rounded-lg"
        [class]="{ 'bg-green-700': isActive, 'text-white': isActive, 'bg-gray-200': !isActive }"
      >
        {{ text }}
      </button>
    </li>
  `,
  styles: [` :host {  } `]
})
export class EventNavButtonComponent {
  @Input() text!: string;

  @Input() isActive = false;

  @Output() action = new EventEmitter<void>();
  
  onAction() {
    this.action.emit();
  }
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  appIcons = appIcons;
  
  eventID = '';

  loading = false;

  error: string | null = null;

  event: Event | null = null;

  showParticipants = false;

  joinLoading = false;

  leaveLoading = false;

  constructor( 
    private readonly route: ActivatedRoute, 
    private readonly eventServie: EventService,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
  ) { }

  get isParticipant() {
    return this.event?.participants.find((p) => p.user.id === this.authService.authUser?.id) !== undefined;
  }

  get isHost() {
    return this.host?.user.id === this.authService.authUser?.id;
  }

  get host() {
    return this.event?.participants.find((p) => p.host);
  }

  get eventOccurrences() {
    return this.event?.eventOccurrences.sort((a, b) => {
      const ad = new Date(a.startedAt);
      const bd = new Date(b.startedAt);

      if (ad.getTime() > bd.getTime()) {
        return -1;
      }
      
      if (ad.getTime() < bd.getTime()) {
        return 1;
      }
      
      return 0;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventID = params['id'];
    });

    this.fetchEvent();
  }

  gotoEventOccurrences() {
    this.showParticipants = false;
  }

  gotoParticipants() {
    this.showParticipants = true;
  }

  copyEventLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    } else {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  
    this.toastrService.success('Event link copied');
  }

  retryFetchEvent() {
    this.error = null;
    this.fetchEvent();
  }

  fetchEvent() {
    if (this.loading) { 
      return;
    }

    this.loading = true;

    this.eventServie.getOne(this.eventID)
      .subscribe({ 
        next: (res) => {
          this.loading = false;
          this.event = res;
        },

        error: (error) =>  {
          this.loading = false;
          this.error = error;
        }
      });
  }

  joinEvent() {
    this.joinLoading = true;

    this.eventServie.join(this.eventID)
      .subscribe({ 
        next: (res) => {
          this.joinLoading = false;
          this.event = res;
          this.toastrService.success('You have joined this event.');
        },

        error: (error) =>  {
          this.joinLoading = false;
          this.toastrService.error(error);
        }
      });
  }

  leaveEvent() {
    this.leaveLoading = true;

    this.eventServie.leave(this.eventID)
      .subscribe({ 
        next: (res) => {
          this.leaveLoading = false;
          this.event = res;
          this.toastrService.success('You have left this event.');
        },

        error: (error) =>  {
          this.leaveLoading = false;
          this.toastrService.error(error);
        }
      });
  }
}
