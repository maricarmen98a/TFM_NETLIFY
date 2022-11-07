import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BoardingPassComponent } from './components/boarding-pass/boarding-pass.component';
import { BoardingPass2Component } from './components/boarding-pass2/boarding-pass2.component';
import { BookingFlightComponent } from './components/booking-flight/booking-flight.component';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CovidComponent } from './components/covid/covid.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { FlightComponent } from './components/flight/flight.component';
import { HelpFormComponent } from './components/help-form/help-form.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SearchBookingComponent } from './components/search-booking/search-booking.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import { SigninComponent } from './components/SingIn-Up-Profile/signin/signin.component';
import { SignupComponent } from './components/SingIn-Up-Profile/signup/signup.component';
import { UserProfileComponent } from './components/SingIn-Up-Profile/user-profile/user-profile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './shared/Services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'request-password', component: ChangePasswordRequestComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'flights', component: FlightComponent },
  { path: 'booking', component: BookingFlightComponent },
  { path: 'extras', component: ExtrasComponent },
  { path: 'policy', component: CookiesComponent,
    canActivate: [AuthGuard],
      data: {
        role: ['admin', 'passenger']
      }  
  },
  { path: 'covid', component: CovidComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['admin', 'pilot']
    }  
  },
  { path: 'select-seat', component: SelectSeatComponent },
  { path: 'search-booking', component: SearchBookingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'boarding-pass', component: BoardingPassComponent },
  { path: 'boarding', component: BoardingPass2Component },
  { path: 'help', component: HelpFormComponent,
    canActivate: [AuthGuard],
      data: {
        role: ['admin', 'passenger']
      }  
  },
  { path: 'about-us', component: AboutUsComponent, 
    canActivate: [AuthGuard],
    data: {
      role: ['admin', 'pilot']
    } 
  },
  { path: '404', component: PagenotfoundComponent },
  {path: '**', redirectTo: '/404'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
