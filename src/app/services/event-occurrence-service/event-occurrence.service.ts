import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDto } from 'src/app/models/api-dto.model';
import { EventOccurrence } from 'src/app/models/event-occurrence.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';

type CreateParam = {
  venue: string;
  duration: number;
  link?: string;
  address?: string;
  description: string;
  startedAt: string;
  eventId: number;
};

@Injectable({
  providedIn: 'root'
})
export class EventOccurrenceService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) { }

  create(form: CreateParam) {
    return new Observable<EventOccurrence>((subscribe) => {
      this.httpClient
        .post<ApiDto<EventOccurrence>>(
          `${environment.apiUrl}event-occurrences`, 
          form,
          { headers: { Authorization: this.authService.bearerToken } }
        )
        .subscribe({ 
          next: (data) => {
            subscribe.next(data.data);
            subscribe.complete();
          }, 
          error: (error) =>  {
            subscribe.error(error.error.error ?? environment.unknownError);
            subscribe.complete();
          }
        });
    });
  }

  getOne(id: string | number) {
    return new Observable<EventOccurrence>((subscribe) => {
      this.httpClient
        .get<ApiDto<EventOccurrence>>(
          `${environment.apiUrl}event-occurrences/${id}`, 
          { headers: { Authorization: this.authService.bearerToken } }
        )
        .subscribe({ 
          next: (data) => {
            subscribe.next(data.data);
            subscribe.complete();
          }, 
          error: (error) =>  {
            subscribe.error(error.error.error ?? environment.unknownError);
            subscribe.complete();
          }
        });
    });
  }
}
