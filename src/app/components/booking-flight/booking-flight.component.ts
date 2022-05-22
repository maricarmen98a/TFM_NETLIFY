import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingDTO } from 'src/app/Models/booking.dto';
import { UnregUserDTO } from 'src/app/Models/unregisteredUser';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { TokenService } from 'src/app/shared/Services/token.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.css']
})
export class BookingFlightComponent implements OnInit {
  bookings: BookingDTO;
  users: any;
  validateForm: boolean = false;
  flight: any;
  name: FormControl;
  email: FormControl; 
  passport: FormControl; 
  phone: FormControl; 
  userForm: FormGroup;

  constructor(private flightService: FlightService, 
    private fb: FormBuilder,
    public tokenService: TokenService, 
    public router: Router) {
    this.bookings = new BookingDTO(1,'','','',1,'', new Date, '', '', 1, '' )
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.name = new FormControl('', [Validators.required]);
    this.passport = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);

    this.userForm = this.fb.group({
      email: this.email,
      name: this.name,
      passport: this.passport,
      phone: this.phone,
    });
  }

  ngOnInit(): void {
    
    this.users = this.flightService.getData();
    if(this.users == undefined) {
      this.handleAuthError();
    }
    this.flight = this.flightService.getDataFlight();
    console.log(this.users) 
    console.log(this.flight)  
    this.userForm.get('name')?.setValue(this.users.name)  
    this.userForm.get('email')?.setValue(this.users.email)  
  } 
  private handleAuthError() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('login');
    alert('Tiene que iniciar sesión.')
  }

  bookFlight() {
    this.validateForm = true;
    this.bookings.email = this.users.email;
    this.bookings.name = this.users.name;
    this.bookings.status = 'Active';
    this.bookings.passengers = 1;
    this.bookings.airline = this.flight.airline;
    this.bookings.origin = this.flight.origin;
    this.bookings.destination = this.flight.destination;
    this.bookings.price = this.flight.price;
    this.bookings.promo_code = this.flight.reservation_code;
     
    this.flightService.createBooking(this.bookings)
    .subscribe()
    console.log(this.bookings)
    this.flightService.setDataBooking(this.bookings);  

}
}
