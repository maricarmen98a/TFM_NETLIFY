import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
import { AuthService } from '../../../shared/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightDTO } from 'src/app/Models/flight';
export class User {
  id?: number;
  name: any;
  email: any;
  phone: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  userForm: FormGroup;
  errors: any;
  userHasBooking: boolean = false;
  bookings: any;
  reservation!: ReservationDTO[];
  reservations!: ReservationDTO;
  bookingSearch: boolean = false;
  filteredReservations!: any[];
  usuario!: User;
  userId!: any;
  gate!: string;
  flights!: FlightDTO[];

  constructor(public authService: AuthService, 
    public fb: FormBuilder, 
    public authState: AuthStateService, 
    public flightService: FlightService,
    public local: LocalStorageService,
    private _snackBar: MatSnackBar
    ) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }
  ngOnInit() {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      this.local.setUsuario('usuario', JSON.stringify(this.UserProfile))
    });
    this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations)); 
    let gates = [ "A2", "A4", "B6", "C7", "D4", "No está definida" ];
    this.gate = gates[Math.floor(Math.random()*gates.length)];
    this.local.setUsuario('gate', JSON.stringify(this.gate));
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
  check() {
    if(this.UserProfile == undefined) {
      alert('Tiene que iniciar sesión para visualizar esta información.');
    } 
    if(this.reservation == undefined || null) {
      this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations));
      return this.reservation;
    } 
    let values = Object.values(this.reservation);
    let merged = values.flat(1);
    this.bookingSearch = true;
    this.userId = this.UserProfile.id
    if (this.bookingSearch) {
      this.filteredReservations = merged.filter((x) => {
        return (x.user_id == this.userId)
      });
    }
    if(this.filteredReservations.length > 0) {
      this.userHasBooking = true;
    } else if(this.filteredReservations == undefined) {
      this.userHasBooking = false;
    }
  }
  update() {
    this.authService.updateUser(this.userForm.value).subscribe(
      () => {
        this.local.setUsuario('usuario', JSON.stringify(this.userForm.value))
        this.openSnackBar('Se ha actualizado correctamente', undefined, 'snackbar') 
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.userForm.reset();
        this.authService.profileUser().subscribe((data: any) => {
          this.UserProfile = data;
          this.local.setUsuario('usuario', JSON.stringify(this.UserProfile));
        });
      }
    );
  }
  setReservation(reservation: any) {
    this.local.setUsuario('reserva', JSON.stringify(reservation))
  }
  openSnackBar(message: string, undefined: string | undefined, className: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: [className]
    });
  }
}

