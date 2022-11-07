import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/SingIn-Up-Profile/signin/signin.component';
import { SignupComponent } from './components/SingIn-Up-Profile/signup/signup.component';
import { UserProfileComponent } from './components/SingIn-Up-Profile/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/Services/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FlightComponent } from './components/flight/flight.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlightModule } from './components/flight/flight.module';
import { NewsComponent } from './components/news/news.component';
import { RandomFlightComponent } from './components/random-flight/random-flight.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RemoveDigitsPipe } from './shared/pipes/removedigits.pipe';
import { BookingFlightComponent } from './components/booking-flight/booking-flight.component';
import { SearchBookingComponent } from './components/search-booking/search-booking.component';
import { ExtrasComponent } from './components/extras/extras.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CovidComponent } from './components/covid/covid.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PaymentComponent } from './components/payment/payment.component';
import { BoardingPassComponent } from './components/boarding-pass/boarding-pass.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BoardingPass2Component } from './components/boarding-pass2/boarding-pass2.component';
import { HelpFormComponent } from './components/help-form/help-form.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthGuard } from './shared/Services/auth-guard.service';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    HomeComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
    FlightComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    RandomFlightComponent,
    RemoveDigitsPipe,
    BookingFlightComponent,
    SearchBookingComponent,
    ExtrasComponent,
    CookiesComponent,
    CovidComponent,
    SelectSeatComponent,
    ConfirmationDialogComponent,
    PaymentComponent,
    BoardingPassComponent,
    BoardingPass2Component,
    HelpFormComponent,
    AboutUsComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlightModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [ AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
