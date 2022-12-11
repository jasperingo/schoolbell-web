import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AccountComponent } from './pages/account/account.component';

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
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
