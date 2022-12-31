import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-host-data',
  templateUrl: './host-data.component.html',
  styleUrls: ['./host-data.component.css']
})
export class HostDataComponent {
  @Input() host?: User;

  @Input() isBlock = true;
}
