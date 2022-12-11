import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.model';
import { ApiDto } from 'src/app/models/api-dto.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loading = false;

  error = new Subject<string | null>();

  data = new BehaviorSubject<Auth | null>(null);

  dataChanged$ = this.data.asObservable();

  errorChanged$ = this.error.asObservable();

  constructor(private readonly httpClient: HttpClient) { }

  mutate(phoneNumber: string, password: string) {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.httpClient
      .post<ApiDto<Auth>>(
        'http://localhost:8080/schoolbell/api/auth', 
        { phoneNumber, password }
      )
      .subscribe({ 
        next: (res) => {
          this.loading = false;
          this.data.next(res.data);
        },
        error: (error) =>  {
          this.loading = false;

          switch(error.status) {
            case 400:
            case 401:
              this.error.next(error.error.error);
              break;

            default: 
              this.error.next('Oops! Something went wrong.');
          }
        },
      });
  }
}
