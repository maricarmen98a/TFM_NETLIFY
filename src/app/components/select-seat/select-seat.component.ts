import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingDTO } from 'src/app/Models/booking.dto';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { TokenService } from 'src/app/shared/Services/token.service';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {
  showIt: boolean = false;
  showReservation: boolean = false;
  seatPrice!: number;
  seat: FormControl;
  reservation!: ReservationDTO[];
  reservations: ReservationDTO;
  arraySeats1: any;
  arraySeats2: any;
  arraySeats3: any;
  arraySeats4: any;
  arraySeats5: any;    
  extra!: number;
  booking!: BookingDTO;
  bookingSearch: boolean = true;
  filteredReservations!: any[];
  checkedTickets: string[] = [];
  bntStyle: string;
  constructor(public flightService: FlightService, public tokenService: TokenService, public router: Router) {
    this.seat = new FormControl('');
    this.reservations = new ReservationDTO(1, 1, 1, 1,'', '', '', '', '', '', 1, '', '' )
    this. bntStyle = 'seat';
   
    this.arraySeats1 = [
      '1A', '1B', '1C', '1D',
      '2A', '2B', '2C', '2D'
    ];
    this.arraySeats2 = [
      '3A', '3B', '3C', '3D', 
      '4A', '4B', '4C', '4D'
    ];
    this.arraySeats3 = [
      '5A', '5B', '5C', '5D', '5E', '5F',
      '6A', '6B', '6C', '6D', '6E', '6F',
      '7A', '7B', '7C', '7D', '7E', '7F',
      '8A', '8B', '8C', '8D', '8E', '8F',
      '9A', '9B', '9C', '9D', '9E', '9F',
      '10A', '10B', '10C', '10D', '10E', '10F' 
    ];
    this.arraySeats4 = [
      '11A', '11B', '11C', '11D', '11E', '11F',
      '12A', '12B', '12C', '12D', '12E', '12F',
      '13A', '13B', '13C', '13D', '13E', '13F',
      '14A', '14B', '14C', '14D', '14E', '14F'
    ]
    this.arraySeats5 = [
      '15A', '15B', '15C', '15D', '15E', '15F',
      '16A', '16B', '16C', '16D', '16E', '16F',
      '17A', '17B', '17C', '17D', '17E', '17F',
      '18A', '18B', '18C', '18D', '18E', '18F',
      '19A', '19B', '19C', '19D', '19E', '19F',
      '20A', '20B', '20C', '20D', '20E', '20F',
      '21A', '21B', '21C', '21D', '21E', '21F',
      '22A', '22B', '22C', '22D', '22E', '22F',
      '23A', '23B', '23C', '23D', '23E', '23F'
    ]
  }
  ngOnInit(): void {
    this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations));
    this.booking = this.flightService.getDataBooking();
    if(this.booking == undefined) {
      this.handleAuthError();
    }
  }
  private handleAuthError() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
    alert('Tiene que elegir un vuelo')
  }
  public form = new FormGroup({
    checkboxes: new FormArray([])
  })
 
  onCheck(evt: any) {
    if (!this.checkedTickets.includes(evt)) {
      this.checkedTickets.push(evt);
    } else {
      var index = this.checkedTickets.indexOf(evt);
      if (index > -1) {
        this.checkedTickets.splice(index, 1);
      }
    }
    if(this.checkedTickets.length > 1) {
      alert('Solo puede elegir un asiento.');
      var index = this.checkedTickets.indexOf(evt);
      this.checkedTickets.splice(index, 1);
      
    }
    if(this.arraySeats1.includes(this.checkedTickets[0])) {
      this.extra = 80;
    } else if(this.arraySeats2.includes(this.checkedTickets[0])) {
      this.extra = 40;
    } else {
      this.extra = 10;
    }
    console.log(this.checkedTickets);
  }
  showInfo() {
    this.showIt = true;
  }
  hideInfo() {
    this.showIt = false;
  }
  setData(reservation: any) {
    this.reservations.passenger_email = this.booking.email;
    this.reservations.passenger_name = this.booking.name;
    this.reservations.status = this.booking.status = 'Active';
    this.reservations.airline = this.booking.airline;
    this.reservations.origin = this.booking.origin;
    this.reservations.destination = this.booking.destination;
    this.reservations.price = this.booking.price + this.extra; 
    this.reservations.reservation_code = this.booking.promo_code;
    this.reservations.seat = this.checkedTickets[0]; 
    this.flightService.createReservation(this.reservations)
    .subscribe()
    console.log(this.reservations)
    this.showReservation = true;
    this.flightService.setDataReservation(reservation);
  }
}
