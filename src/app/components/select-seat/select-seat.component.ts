import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingDTO } from 'src/app/Models/booking.dto';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { ConfirmationDialogComponent } from 'src/app/shared/Components/confirmation-dialog/confirmation-dialog.component';
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
  step: boolean = false;
  clickcounter: number = 0;
  constructor(public flightService: FlightService, public tokenService: TokenService, public router: Router, public dialog: MatDialog) {
    this.seat = new FormControl('');
    this.reservations = new ReservationDTO(1, 1, 1, 1,'', '', '', '', '', '', 1, '', '' )
    this. bntStyle = 'seat';
    this.arraySeats1 = [
      {value: '1B', checked: false}, {value: '1C', checked: false}, {value: '1D', checked: false}, {value: '2A', checked: false}, {value: '2B', checked: false}, {value: '2C', checked: false}
    ];
    this.arraySeats2 = [
      {value: '3A', checked: false}, {value: '3B', checked: false}, {value: '3C', checked: false}, {value: '3D', checked: false}, {value: '4A', checked: false}, {value: '4B', checked: false}
    ];
    this.arraySeats3 = [
      {value: '5B', checked: false}, {value: '5C', checked: false}, {value: '5D', checked: false}, {value: '5E', checked: false}, {value: '5F', checked: false}, {value: '6A', checked: false}, {value: '6B', checked: false}, {value: '6C', checked: false}, {value: '6D', checked: false}, {value: '6E', checked: false}, {value: '6F', checked: false}, {value: '7A', checked: false}, {value: '7B', checked: false}, {value: '7C', checked: false}, {value: '7D', checked: false}, {value: '7E', checked: false}, {value: '7F', checked: false}, {value: '8A', checked: false}, {value: '8B', checked: false}, {value: '8C', checked: false}, {value: '8D', checked: false}, {value: '8E', checked: false}, {value: '8F', checked: false}, {value: '9A', checked: false}, {value: '9B', checked: false}, {value: '9C', checked: false}, {value: '9D', checked: false}, {value: '9E', checked: false}, {value: '9F', checked: false}, {value: '10A', checked: false}, {value: '10B', checked: false}, {value: '10C', checked: false}, {value: '10D', checked: false}, {value: '10E', checked: false}, {value: '10F', checked: false}
    ];
    this.arraySeats4 = [
      {value: '11C', checked: false}, {value: '11D', checked: false}, {value: '11E', checked: false}, {value: '11F', checked: false}, {value: '12A', checked: false}, {value: '12B', checked: false}, {value: '12C', checked: false}, {value: '12D', checked: false}, {value: '12E', checked: false}, {value: '12F', checked: false}, {value: '13A', checked: false}, {value: '13B', checked: false}, {value: '13C', checked: false}, {value: '13D', checked: false}, {value: '13E', checked: false}, {value: '13F', checked: false}, {value: '14A', checked: false}, {value: '14B', checked: false}, {value: '14C', checked: false}
    ]
    this.arraySeats5 = [
      {value: '15E', checked: false}, {value: '15F', checked: false}, {value: '16A', checked: false}, {value: '16B', checked: false}, {value: '16C', checked: false}, {value: '16D', checked: false}, {value: '16E', checked: false}, {value: '16F', checked: false}, {value: '17A', checked: false}, {value: '17B', checked: false}, {value: '17C', checked: false}, {value: '17D', checked: false}, {value: '17E', checked: false}, {value: '17F', checked: false}, {value: '18A', checked: false}, {value: '18B', checked: false}, {value: '18C', checked: false}, {value: '18D', checked: false}, {value: '18E', checked: false}, {value: '18F', checked: false}, {value: '19A', checked: false}, {value: '19B', checked: false}, {value: '19C', checked: false}, {value: '19D', checked: false}, {value: '19E', checked: false}, {value: '19F', checked: false}, {value: '20A', checked: false}, {value: '20B', checked: false}, {value: '20C', checked: false}, {value: '20D', checked: false}, {value: '20E', checked: false}, {value: '20F', checked: false}, {value: '21A', checked: false}, {value: '21B', checked: false}, {value: '21C', checked: false}, {value: '21D', checked: false}, {value: '21E', checked: false}, {value: '21F', checked: false}, {value: '22A', checked: false}, {value: '22B', checked: false}, {value: '22C', checked: false}, {value: '22D', checked: false}, {value: '22E', checked: false}, {value: '22F', checked: false}, {value: '23A', checked: false},
      {value: '23B', checked: false}, {value: '23C', checked: false}, {value: '23D', checked: false}, {value: '23E', checked: false}
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
  uncheckOther(chk: any) {
    if (event) {
      this.arraySeats1.forEach((x: { checked: boolean; }) => {
        if (x.checked == true)
          x.checked = false;
      });
      this.arraySeats2.forEach((x: { checked: boolean; }) => {
        if (x.checked == true)
          x.checked = false;
      });
      this.arraySeats3.forEach((x: { checked: boolean; }) => {
        if (x.checked == true)
          x.checked = false;
      });
      this.arraySeats4.forEach((x: { checked: boolean; }) => {
        if (x.checked == true)
          x.checked = false;
      });
      this.arraySeats5.forEach((x: { checked: boolean; }) => {
        if (x.checked == true)
          x.checked = false;
      });
      if (chk.checked == true) {
        chk.checked = false;
      } else {
        chk.checked = true;
      }
    }
  } 
  onCheck(evt: any) {
    if (!this.checkedTickets.includes(evt)) {
      this.checkedTickets.push(evt);
    } else {
      var index = this.checkedTickets.indexOf(evt);
      if (index > -1) {
        this.checkedTickets.splice(index, 1);
      }
    }
    if (this.checkedTickets.length > 1) {
      this.checkedTickets.splice(0, 1);
    }
    if (this.arraySeats1.includes(this.checkedTickets[0])) {
      this.extra = 80;
    } else if (this.arraySeats2.includes(this.checkedTickets[0])) {
      this.extra = 40;
    } else {
        this.extra = 10;
    }
    console.log(this.checkedTickets);
    let seatArray = this.checkedTickets[0];
    const selectedSeat = Object.values(seatArray)[0];
    console.log(selectedSeat)
  }
  showInfo() {
    this.showIt = true;
  }
  hideInfo() {
    this.showIt = false;
  }
  setData(reservation: any) {
    let seatArray = this.checkedTickets[0];
    const selectedSeat = Object.values(seatArray)[0];
    this.reservations.passenger_email = this.booking.email;
    this.reservations.passenger_name = this.booking.name;
    this.reservations.status = this.booking.status = 'Active';
    this.reservations.airline = this.booking.airline;
    this.reservations.origin = this.booking.origin;
    this.reservations.destination = this.booking.destination;
    this.reservations.price = this.booking.price + this.extra; 
    this.reservations.reservation_code = this.booking.promo_code;
    this.reservations.seat = selectedSeat; 
    this.flightService.createReservation(this.reservations)
    .subscribe()
    console.log(this.reservations)
    this.showReservation = true;
    this.flightService.setDataReservation(this.reservations);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "¿Está seguro de que desea continuar?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.setData(this.reservation)
        this.router.navigate(['extras']);
      }
    });
  }
}
