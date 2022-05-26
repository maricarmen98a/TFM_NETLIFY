import { Component, OnInit } from '@angular/core';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { AuthService } from 'src/app/shared/Services/auth.service';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-boarding-pass2',
  templateUrl: './boarding-pass2.component.html',
  styleUrls: ['./boarding-pass2.component.css']
})
export class BoardingPass2Component implements OnInit {
  UserProfile!: User;
  gate!: string;
  reservation!: ReservationDTO[];
  userId!: string;
  filteredReservations!: any[];
  userHasBooking: boolean = false;
  isSignedIn: boolean = false;
  searchStatus: boolean = false;

  constructor(public authService: AuthService, 
    public authState: AuthStateService, 
    public flightService: FlightService,
    public local: LocalStorageService,
    private auth: AuthStateService) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    if(this.isSignedIn == true) {
      let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
      this.UserProfile = retrievedObject;
    }
    this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations)); 
  }
  check() {
    let gates = [ "A2", "A4", "B6", "C7", "D4", "No está definida" ];
    this.gate = gates[Math.floor(Math.random()*gates.length)];
    this.local.setUsuario('gate', JSON.stringify(this.gate));
    
    if (this.UserProfile) {
      let values = Object.values(this.reservation);
      let merged = values.flat(1);
      this.filteredReservations = merged.filter((x) => {
        return (x.passenger_email == this.UserProfile.email)
      });
      if(this.filteredReservations.length > 0){
          this.searchStatus = true;
          this.userHasBooking = true;
      } else { 
          this.searchStatus = false;
      }
      if(this.filteredReservations == undefined) {
        console.error('No tiene ningún vuelo planificado todavía')
      }
    }
    this.local.setUsuario('reserva', JSON.stringify(this.filteredReservations))
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  setReservation(reservation: any) {
    this.local.setUsuario('reserva', JSON.stringify(reservation))
  }
}
