import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightDTO } from 'src/app/Models/flight';
import { UnregUserDTO } from 'src/app/Models/unregisteredUser';
import { FlightService } from 'src/app/shared/Services/flight.service';

@Component({
  selector: 'app-random-flight',
  templateUrl: './random-flight.component.html',
  styleUrls: ['./random-flight.component.css']
})
export class RandomFlightComponent implements OnInit {
  vuelosAleatorios: boolean = false;
  selectedRandom!: FlightDTO[];
  flights!: FlightDTO[];
  errorMessage!: string;  
  selected: boolean = false;
  validateForm: boolean = false;
  users: UnregUserDTO;
  userConfirmado: boolean = false;

  name: FormControl;
  email: FormControl; 
  userForm: FormGroup;
  constructor(public flightService: FlightService, public fb: FormBuilder) {
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
    this.flightService.getFlight().subscribe(() => {
      this.getAllContent()});
  }
  private getAllContent() {
    this.flightService
      .getFlight()
      .subscribe((flights: FlightDTO[]) => (this.flights = flights));
    }
  getRandomFlight() {
    let values = Object.values(this.flights);
    let merged = values.flat(1);
    let shuffled = merged.sort(function(){return .5 - Math.random()});
    let selected = shuffled.slice(0,4);
    this.selectedRandom = selected;
    console.log(selected);
    this.vuelosAleatorios = true; 
  }
  checkUnregUser( ) {
    this.validateForm = true;
    this.users.email = this.email.value;
    this.users.name = this.name.value;
    this.users = this.userForm.value;
    this.flightService.createUnregUser(this.users)
      .subscribe(()=> {},  () => {
        this.userConfirmado = false;
      })
    console.log(this.users);
    this.userConfirmado = true;
    this.flightService.setData(this.users);  
  }
  submitSelected() {
    this.selected = true;
  }
  setFlight(flight: any) {
    flight.price = flight.price - 50; 
    this.flightService.setDataFlight(flight);
  }
}
