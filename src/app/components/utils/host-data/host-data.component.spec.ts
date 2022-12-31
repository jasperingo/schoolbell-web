import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDataComponent } from './host-data.component';

describe('HostDataComponent', () => {
  let component: HostDataComponent;
  let fixture: ComponentFixture<HostDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
