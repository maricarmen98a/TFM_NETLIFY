import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightDTO } from 'src/app/Models/flight';
import { UnregUserDTO } from 'src/app/Models/unregisteredUser';
import { UserDTO } from 'src/app/Models/user.dto';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';

@Component({
  selector: 'app-random-flight',
  templateUrl: './random-flight.component.html',
  styleUrls: ['./random-flight.component.css']
})
export class RandomFlightComponent implements OnInit {
  vuelosAleatorios: boolean = false;
  selectedRandom!: FlightDTO[];
  flights!: FlightDTO[];
  selected: boolean = false;
  validateForm: boolean = false;
  users: UnregUserDTO;
  userConfirmado: boolean = false;
  errors: any = null;
  usuario!: UserDTO;
  name: FormControl;
  email: FormControl; 
  userForm: FormGroup;

  constructor(public flightService: FlightService, public fb: FormBuilder, private auth: AuthStateService, public dialog: MatDialog, public local: LocalStorageService, public router: Router) {
    this.users = new UnregUserDTO( '', '');
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.name = new FormControl('', [
      Validators.required
    ]);
    this.userForm = this.fb.group({
      email: this.email,
      name: this.name,
    });
  }
  ngOnInit(): void {   
    this.auth.userAuthState.subscribe((val) => {
      this.userConfirmado = val;
    });
    let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
    this.usuario = retrievedObject;
    this.flightService.getFlight().subscribe((flights: FlightDTO[]) => (this.flights = flights));

  }

  getRandomFlight() {
    console.log(this.flights)
    console.log('this.flights 58')
    console.log('esta actualizado8')
    let values = Object.values(this.flights);
    console.log(this.flights)
    console.log('this.flights')
    let merged = values.flat(1);
    let shuffled = merged.sort(function(){return .5 - Math.random()});
    let selected = shuffled.slice(0,4);
    this.selectedRandom = selected;
    this.vuelosAleatorios = true;
    let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
    this.usuario = retrievedObject; 
  }
  checkUser( ) {
    this.validateForm = true;
    if (this.userConfirmado == true) {
      this.users.email = this.usuario.email;
      this.users.name = this.usuario.name;
    } else {
    this.users.email = this.email.value;
    this.users.name = this.name.value;
    this.users = this.userForm.value;
    this.flightService.createUnregUser(this.users)
      .subscribe(() => {
        this.userConfirmado = true;
        this.local.setUsuario('usuario', JSON.stringify(this.users))
      },
      (error: any) => {
        this.errors = error.error;
        this.userConfirmado = false;
      })
    }     
  }
  setFlight(flight: any) {
    let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
    this.usuario = retrievedObject;
    flight.price = flight.price - 50; 
    this.checkUser();  
    this.local.setUsuario('flight', JSON.stringify(flight))
  }
  openDialog(flight: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '320px',
      data: "¿Está seguro de que desea continuar?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.setFlight(flight);
        this.router.navigate(['booking']);
      }
    });
  }
}
