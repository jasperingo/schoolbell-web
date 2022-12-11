import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastNoAnimationModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent, IndexNavLinkComponent } from './pages/index/index.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SubmitButtonComponent } from './components/forms/submit-button/submit-button.component';
import { PasswordInputComponent } from './components/forms/password-input/password-input.component';
import { SmallLoaderComponent } from './components/loaders/small-loader/small-loader.component';
import { AccountComponent, AccountNavItemComponent, UserDLItemComponent } from './pages/account/account.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { BigLoaderComponent } from './components/loaders/big-loader/big-loader.component';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { HeaderTwoComponent } from './components/utils/header-two/header-two.component';
import { EmptyListComponent } from './components/utils/empty-list/empty-list.component';
import { ErrorMessageComponent } from './components/utils/error-message/error-message.component';
import { EventItemComponent } from './components/lists/event-item/event-item.component';
import { EventComponent, EventNavButtonComponent } from './pages/event/event.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { EventOccurrenceItemComponent } from './components/lists/event-occurrence-item/event-occurrence-item.component';
import { ParticipantsItemComponent } from './components/lists/participants-item/participants-item.component';
import { TextareaInputComponent } from './components/forms/textarea-input/textarea-input.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexNavLinkComponent,
    TextInputComponent,
    SignUpComponent,
    SignInComponent,
    SubmitButtonComponent,
    PasswordInputComponent,
    SmallLoaderComponent,
    AccountComponent,
    CalendarComponent,
    BigLoaderComponent,
    UserDLItemComponent,
    AccountNavItemComponent,
    EventsComponent,
    CreateEventComponent,
    HeaderTwoComponent,
    EmptyListComponent,
    ErrorMessageComponent,
    EventItemComponent,
    EventComponent,
    PageNotFoundComponent,
    EventNavButtonComponent,
    EventOccurrenceItemComponent,
    ParticipantsItemComponent,
    TextareaInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
