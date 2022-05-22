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
import { HeaderComponent } from './shared/Components/header/header.component';
import { FooterComponent } from './shared/Components/footer/footer.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlightModule } from './components/flight/flight.module';
import { NewsComponent } from './components/news/news.component';
import { RangePipe } from './shared/pipes/flight.pipe';
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
    RangePipe,
    RandomFlightComponent,
    RemoveDigitsPipe,
    BookingFlightComponent,
    SearchBookingComponent,
    ExtrasComponent,
    CookiesComponent,
    CovidComponent,
    SelectSeatComponent
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
    MatExpansionModule
    
  ],
  providers: [
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
