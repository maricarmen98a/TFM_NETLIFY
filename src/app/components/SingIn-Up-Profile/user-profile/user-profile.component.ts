import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { UserDTO } from 'src/app/Models/user.dto';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
import { TokenService } from 'src/app/shared/Services/token.service';
import { AuthService } from '../../../shared/Services/auth.service';
export class User {
  name: any;
  email: any;
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
  usuario1!: UserDTO;
userId!: string;
  constructor(public authService: AuthService, 
    public fb: FormBuilder, 
    public authState: AuthStateService, 
    private token: TokenService,
    public flightService: FlightService,
    public local: LocalStorageService
    ) {
    
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }
  ngOnInit() {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      this.flightService.setDataUser(this.UserProfile);
      this.local.setUsuario(this.usuario1, this.UserProfile)
    });

    this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservation = reservations));    

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
    let values = Object.values(this.reservation);
    let merged = values.flat(1);
    this.bookingSearch = true;
    console.log(merged) 
    this.userId = this.UserProfile.name
    if (this.bookingSearch) {
      this.filteredReservations = merged.filter((x) => {
        return (x.passenger_name == this.userId)
      });
    }
    if(this.filteredReservations.length > 0) {
      this.userHasBooking = true;
    } else if(this.filteredReservations == undefined) {
      this.userHasBooking = false;
    }
    console.log(this.filteredReservations) 
    console.log(this.UserProfile) 

  }
  update() {
    this.authService.updateUser(this.userForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
        console.log(this.UserProfile)

      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.userForm.reset();
      }
    );
  }
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }
 loadData() {
    console.log(this.UserProfile)

  }
}

