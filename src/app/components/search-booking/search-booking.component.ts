import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { Location } from '@angular/common';
import { UserDTO } from 'src/app/Models/user.dto';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']
})
export class SearchBookingComponent implements OnInit {
  userHasBooking: boolean = false;
  emptyArray: boolean = false;
  bookingSearch: FormControl;
  reservation!: ReservationDTO[];
  reservations!: ReservationDTO;
  filteredReservations!: any[];
  searchStatus: boolean = false;
  validateForm: boolean = false;
  searchForm: boolean = false;
  usuario!: UserDTO;
  isloaded: boolean = false;
  isSignedIn: boolean = false;
  
  constructor(public location: Location, private auth: AuthStateService,  public local: LocalStorageService, private flightService: FlightService) {
    this.bookingSearch = new FormControl('', [
      Validators.required
    ]);
  }
  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    if(this.isSignedIn == true) {
      let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
      this.usuario = retrievedObject;
    }
     this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations ));
  }
  back(): void {
    this.location.back()
  }
  loadData() {
   
    this.isloaded = true;
    
    if (this.usuario) {
      this.validateForm = true;
      let values = Object.values(this.reservation);
      let merged = values.flat(1);
      this.filteredReservations = merged.filter((x) => {
        return (x.passenger_email == this.usuario.email)
      });
      
      if(this.filteredReservations.length > 0){
          this.searchStatus = true;
          this.userHasBooking = true;
          this.emptyArray = false;
      } else { 
          this.searchStatus = false;
      }
    }
    this.local.setUsuario('reserva', JSON.stringify(this.filteredReservations))
  }
  chooseReservation(reservation: any) {
    this.local.setUsuario('reserva', JSON.stringify(reservation))
  }
  search() {
   
    this.searchForm = true;
    this.isloaded = true;
    console.log(this.reservation)
    console.log('console this.reservation')
    console.log(this.reservation[0].reservation_code)
     
    if (this.bookingSearch) {
      let values = Object.values(this.reservation);
      let merged = values.flat(1);  
      console.log(this.bookingSearch + ' existe el booking search')
      console.log(this.bookingSearch.value + ' existe el booking search value')
      console.log(merged[0].reservation_code + 'merged code')
      this.filteredReservations = merged.filter((x) => {
        return x.reservation_code == this.bookingSearch.value
      });
      console.log(this.filteredReservations + ' console this.filteredreservation')
    }
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
    let arraySearch = this.filteredReservations[0];
    console.log(arraySearch + ' console arraysearch')
    this.local.setUsuario('reserva', JSON.stringify(arraySearch))
  }
}
