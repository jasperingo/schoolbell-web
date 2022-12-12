import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { AuthService } from '../auth-service/auth.service';
import { ApiDto } from 'src/app/models/api-dto.model';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) { }

  create(form: { title: string; description: string; }) {
    return new Observable<Event>((subscribe) => {
      this.httpClient
        .post<ApiDto<Event>>(
          `${environment.apiUrl}events`, 
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
    return new Observable<Event>((subscribe) => {
      this.httpClient
        .get<ApiDto<Event>>(
          `${environment.apiUrl}events/${id}`, 
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

  getMany() {
    return new Observable<Event[]>((subscribe) => {
      this.httpClient
        .get<ApiDto<Event[]>>(
          `${environment.apiUrl}events`, 
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

  join(id: string | number) {
    return new Observable<Event>((subscribe) => {
      this.httpClient
        .post<ApiDto<Event>>(
          `${environment.apiUrl}events/${id}/join`, 
          null,
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

  leave(id: string | number) {
    return new Observable<Event>((subscribe) => {
      this.httpClient
        .post<ApiDto<Event>>(
          `${environment.apiUrl}events/${id}/leave`, 
          null,
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
