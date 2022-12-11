import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(
    private readonly authService: AuthService, 
  ) {
    console.log(authService.authUser);
  }

  ngOnInit() {
   
  }
}
