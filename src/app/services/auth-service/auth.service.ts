import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.model';
import { ApiDto } from 'src/app/models/api-dto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth | null = null;

  authUser: User | null = null;

  constructor(private readonly httpClient: HttpClient) { }

  get bearerToken() {
    return `Bearer ${this.auth?.accessToken}`;
  }

  saveAuth() {
    window.sessionStorage.setItem('accessToken', this.auth?.accessToken ?? '');
    window.sessionStorage.setItem('expirationDate', this.auth?.expirationDate ?? '');
  }

  loadAuth() {
    if (this.auth === null) {
      const accessToken = window.sessionStorage.getItem('accessToken');
      const expirationDate = window.sessionStorage.getItem('expirationDate');

      if (accessToken !== null && expirationDate !== null) {
        this.auth = { accessToken, expirationDate };
      }
    }
  }

  clearAuth() {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('expirationDate');
  }

  create(phoneNumber: string, password: string) {
    return new Observable<Auth>((subscribe) => {
      this.httpClient
        .post<ApiDto<Auth>>(`${environment.apiUrl}auth`, { phoneNumber, password })
        .subscribe({ 
          next: (res) => {
            this.auth = res.data;
            this.saveAuth();
            subscribe.next(res.data);
            subscribe.complete();
          },

          error: (error) =>  {
            switch(error.status) {
              case 400:
              case 401:
                subscribe.error(error.error.error);
                break;

              default: 
                subscribe.error('Oops! Something went wrong.');
            }

            subscribe.complete();
          },
        });
    });
  }
}
