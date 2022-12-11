import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiDto } from 'src/app/models/api-dto.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) { }

  create(form: { firstName: string; lastName: string; phoneNumber: string; password: string; }) {
    return new Observable<User>((subscribe) => {
      this.httpClient
        .post<ApiDto<User>>(`${environment.apiUrl}users`, form, { headers: { Authorization: this.authService.bearerToken } })
        .subscribe({ 
          next: (res) => {
            subscribe.next(res.data);
            subscribe.complete();
          },

          error: (error) =>  {
            subscribe.error(error.error.error ?? environment.unknownError);
            subscribe.complete();
          },
        });
    });
  }

  me() {
    return new Observable<User>((subscribe) => {
      this.httpClient
        .get<ApiDto<User>>(
          `${environment.apiUrl}users/me`, 
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
