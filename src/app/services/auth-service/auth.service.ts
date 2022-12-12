import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.model';
import { ApiDto } from 'src/app/models/api-dto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth | null = null;

  authUser: User | null = null;

  redirectUrl: string | null = null;

  constructor(private readonly httpClient: HttpClient) { }

  get bearerToken() {
    return `Bearer ${this.auth?.accessToken}`;
  }

  get authUserFullName() {
    return `${this.authUser?.firstName} ${this.authUser?.lastName}`;
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
    this.auth = null;
    this.authUser = null;
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
            subscribe.error(error.error.error ?? environment.unknownError);
            subscribe.complete();
          },
        });
    });
  }
}
