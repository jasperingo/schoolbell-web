import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsItemComponent } from './participants-item.component';

describe('ParticipantsItemComponent', () => {
  let component: ParticipantsItemComponent;
  let fixture: ComponentFixture<ParticipantsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
