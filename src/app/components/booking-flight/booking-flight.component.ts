import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Time } from "@angular/common";
import { ReservationDTO, TimeFlight } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { TokenService } from 'src/app/shared/Services/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.css']
})
export class BookingFlightComponent implements OnInit {
  reservations: ReservationDTO;
  users: any;
  validateForm: boolean = false;
  flight: any;
  name: FormControl;
  email: FormControl; 
  passport: FormControl; 
  phone: FormControl; 
  userForm: FormGroup;
  boardingHour: TimeFlight = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  arrivalHour: TimeFlight = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  constructor(private flightService: FlightService, 
    private location: Location,
    private fb: FormBuilder,
    public tokenService: TokenService, 
    public router: Router) {
    this.reservations = new ReservationDTO(1, 1, 1,'', '', '', '', '', '', 1, '', '', new Date, new Date, '','' )
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
    
    this.users = this.flightService.getDataUser();
    if(this.users == undefined) {
      this.handleAuthError();
    }
    this.flight = this.flightService.getDataFlight();
    this.userForm.get('name')?.setValue(this.users.name)  
    this.userForm.get('email')?.setValue(this.users.email)  
  } 
  private handleAuthError() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('login');
    alert('Tiene que iniciar sesión.')
  }
  back(): void {
    this.location.back()
  }
  bookFlight() {
    this.validateForm = true;
    this.reservations.passenger_email = this.users.email;
    this.reservations.user_id = this.users.id;
    this.reservations.passenger_name = this.users.name;
    this.reservations.status = 'Active';
    this.reservations.airline = this.flight.airline;
    this.reservations.flight_id = this.flight.flight_number;
    this.reservations.origin = this.flight.origin;
    this.reservations.destination = this.flight.destination;
    this.reservations.price = this.flight.price;
    this.reservations.boarding_hour = this.flight.boarding_hour;
    this.reservations.boarding_time = this.flight.boarding_time;
    this.reservations.arrival_hour = this.flight.arrival_hour;
    this.reservations.arrival_time = this.flight.arrival_time;
    this.reservations.reservation_code = this.flight.reservation_code;
    this.reservations.seat = '23A';
     
    this.flightService.createReservation(this.reservations)
    .subscribe()
    console.log(this.reservations)
    this.flightService.setDataReservation(this.reservations);  

}
}
