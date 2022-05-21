import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']
})
export class SearchBookingComponent implements OnInit {
  userLoggedIn: boolean = false;
  userHasBooking: boolean = false;
  emptyArray: boolean = false;
  bookingSearch: FormControl;
  reservation!: ReservationDTO[];
  reservations!: ReservationDTO;
  filteredReservations!: any[];
  searchStatus: boolean = false;
  validateForm: boolean = false;

  constructor( private flightService: FlightService) {
    this.bookingSearch = new FormControl('', [
      Validators.required
    ]);
   }

  ngOnInit(): void {
    this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations));

  }
  search() {
    this.validateForm = true;
    let values = Object.values(this.reservation);
    let merged = values.flat(1);
    console.log(merged) 
   
    if (this.bookingSearch) {
      this.filteredReservations = merged.filter((x) => {
        return (x.reservation_code == this.bookingSearch.value)
      });}
      console.log(this.filteredReservations)
    if(this.filteredReservations.length > 0){
        this.searchStatus = true;
        this.userHasBooking = true;
        this.emptyArray = false;
    } else { 
        this.searchStatus = false;
    }
    if(this.filteredReservations.length == 0 && !this.bookingSearch.hasError('required')) {
      this.emptyArray = true;
    } 

  }

}
/*   let reserva;
    let origen1: any = this.filteredFlights.map((x) => { return x.origin} )
    let origen2 = this.booking.map((x) => { return x.origin} )
    let destino2 = this.booking.map((x) => { return x.destination} )
    let destino1: any = this.filteredFlights.map((x) => { return x.destination} )
    let origenEcontrado = origen2.find(element => element == origen1);
    let destinoEncontrado = destino2.find(element => element == destino1);
    reserva = this.booking.filter((x) => {
        return (x.origin == origen1) &&
          (x.destination == destino1) })  */