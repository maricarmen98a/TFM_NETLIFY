import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingFlightComponent } from './components/booking-flight/booking-flight.component';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CovidComponent } from './components/covid/covid.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { FlightComponent } from './components/flight/flight.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SearchBookingComponent } from './components/search-booking/search-booking.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import { SigninComponent } from './components/SingIn-Up-Profile/signin/signin.component';
import { SignupComponent } from './components/SingIn-Up-Profile/signup/signup.component';
import { UserProfileComponent } from './components/SingIn-Up-Profile/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'request-password', component: ChangePasswordRequestComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'flights', component: FlightComponent },
  { path: 'booking', component: BookingFlightComponent },
  { path: 'extras', component: ExtrasComponent },
  { path: 'policy', component: CookiesComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'select-seat', component: SelectSeatComponent },
  { path: 'search-booking', component: SearchBookingComponent },
  { path: 'payment', component: PaymentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
