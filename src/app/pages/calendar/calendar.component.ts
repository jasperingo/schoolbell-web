import { Component, OnInit } from '@angular/core';
import { appIcons } from 'src/app/app-icons';
import { EventOccurrence } from 'src/app/models/event-occurrence.model';
import { UserService } from 'src/app/services/user-service/user.service';


const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  appIcons = appIcons;

  date = new Date();

  loaded = false;
  
  loading = false;
  
  error: string | null = null;

  list: EventOccurrence[] = [];

  constructor(private readonly userService: UserService) {}

  get dateString() {
    return this.date.toLocaleDateString("en-US", { dateStyle: 'full'});
  }

  get currentList() {
    return this.list.filter(event => {
      const eDate = new Date(event.startedAt);

      return (
        eDate.getDate() === this.date.getDate() && 
        eDate.getMonth() === this.date.getMonth() && 
        eDate.getFullYear() === this.date.getFullYear()
      );
    })
    .sort((a, b) => {
      const ad = new Date(a.startedAt);
      const bd = new Date(b.startedAt);

      if (ad.getTime() < bd.getTime()) {
        return -1;
      }
      
      if (ad.getTime() > bd.getTime()) {
        return 1;
      }
      
      return 0;
    });
  }

  nextDate() {
    this.date.setDate(this.date.getDate() + 1);
  }

  previousDate() {
    this.date.setDate(this.date.getDate() - 1);
  }

  ngOnInit(): void {
    this.fetchList();
  }

  retryFetchList() {
    this.error = null;
    this.fetchList();
  }

  fetchList() {
    if (this.loading) return;

    this.loading = true;

    this.userService.getManyEventOccurrence()
      .subscribe({ 
        next: (data) => {
          this.loaded = true;
          this.loading = false;
          this.list = data;
        }, 
        error: (error) =>  {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
