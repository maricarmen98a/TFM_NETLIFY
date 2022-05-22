import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingFlightComponent } from './components/booking-flight/booking-flight.component';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { FlightComponent } from './components/flight/flight.component';
import { HomeComponent } from './components/home/home.component';
import { SearchBookingComponent } from './components/search-booking/search-booking.component';
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
  { path: 'search-booking', component: SearchBookingComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
