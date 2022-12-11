import { Component, Input, OnInit } from '@angular/core';
import { Participant } from 'src/app/models/participant.model';
import { CreateAvatarService } from 'src/app/services/create-avatar/create-avatar.service';

@Component({
  selector: 'app-participants-item',
  templateUrl: './participants-item.component.html',
  styleUrls: ['./participants-item.component.css']
})
export class ParticipantsItemComponent implements OnInit {
  @Input() item!: Participant;

  initials = '';

  avatarColor = '';

  constructor(
    private readonly createAvatarService: CreateAvatarService,
  ) {}

  ngOnInit() {
    const [color, letters] = this.createAvatarService.create([
      this.item.user.firstName, 
      this.item.user.lastName
    ]);

    this.avatarColor = color;
    this.initials = letters;
  }
}
