import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { IndexComponent } from './pages/index/index.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { GuestGuard } from './guards/guest-guard/guest.guard';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventComponent } from './pages/event/event.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { EventOccurrenceComponent } from './pages/event-occurrence/event-occurrence.component';
import { CreateEventOccurrenceComponent } from './pages/create-event-occurrence/create-event-occurrence.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivateChild: [GuestGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      }
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: CalendarComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'create-event',
        component: CreateEventComponent,
      },
      {
        path: 'events/:id',
        component: EventComponent,
      },
      {
        path: 'events/:id/create-event-occurrence',
        component: CreateEventOccurrenceComponent,
      },
      {
        path: 'event-occurrences/:id',
        component: EventOccurrenceComponent,
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
