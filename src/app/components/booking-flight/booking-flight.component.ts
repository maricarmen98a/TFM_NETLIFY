import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { TokenService } from 'src/app/shared/Services/token.service';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
import { UserDTO } from 'src/app/Models/user.dto';
@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.css']
})
export class BookingFlightComponent implements OnInit {
  reservations: ReservationDTO;
  users!: UserDTO;
  validateForm: boolean = false;
  flight: any;
  name: FormControl;
  email: FormControl; 
  passport: FormControl; 
  phone: FormControl; 
  userForm: FormGroup;

  constructor(private location: Location,
    private fb: FormBuilder,
    public tokenService: TokenService, 
    public router: Router,
    public local: LocalStorageService
    ) {
    this.reservations = new ReservationDTO(1, 1, 1,'', '', '', '', '', '', '', 1, '', '', new Date, new Date, '','' )
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
    let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
    this.users = retrievedObject;
    if(this.users == undefined) {
      this.handleAuthError();
    }
    let retrievedFlight = JSON.parse(this.local.getUsuario('flight') || '{}');
    this.flight = retrievedFlight;
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
  stringGen(len: any) {
    let text = "";
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }
  bookFlight() {
    let codigo = this.stringGen(10);
    this.validateForm = true;
    this.reservations.passenger_email = this.users.email;
    this.reservations.passenger_name = this.users.name;
    this.reservations.user_id = this.users.id;
    this.reservations.passenger_passport = this.userForm.value.passport;
    this.reservations.passenger_phone = this.userForm.value.phone;
    this.reservations.airline = this.flight.airline;
    this.reservations.flight_id = this.flight.flight_number;
    this.reservations.origin = this.flight.origin;
    this.reservations.destination = this.flight.destination;
    this.reservations.price = this.flight.price;
    this.reservations.boarding_hour = this.flight.boarding_hour;
    this.reservations.boarding_time = this.flight.boarding_time;
    this.reservations.arrival_hour = this.flight.arrival_hour;
    this.reservations.arrival_time = this.flight.arrival_time;
    this.reservations.reservation_code = codigo;
    this.reservations.seat = '23A';
    if(this.userForm.valid) {
      this.local.setUsuario('reserva', JSON.stringify(this.reservations))
      this.local.setUsuario('usuario',JSON.stringify(this.users)); 
      this.router.navigateByUrl('select-seat')
    } 
  }
}
