import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(
    readonly authService: AuthService, 
  ) {
    console.log(authService.data.getValue());
  }
}
