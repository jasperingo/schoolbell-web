import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  loaded = false;
  
  loading = false;
  
  error: string | null = null;

  list: Event[] = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.fetchList();
  }

  retryFetchList() {
    this.error = null;
  }

  fetchList() {
    if (this.loading) return;

    this.loading = true;

    this.userService.getManyEvents()
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
