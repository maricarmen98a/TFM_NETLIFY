import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { FlightDTO } from 'src/app/Models/flight';
import { CityDTO } from 'src/app/Models/city';
import { faExchangeAlt, faExclamationCircle, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { CountryDTO } from 'src/app/Models/country';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnregUserDTO } from 'src/app/Models/unregisteredUser';
import { HeaderMenusService } from 'src/app/shared/Services/header-menus.service';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { UserDTO } from 'src/app/Models/user.dto';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  faPlaneUp = faPlaneDeparture;
  faPlaneDown = faPlaneArrival;
  faChange = faExchangeAlt;
  faAviso = faExclamationCircle;
  flights!: FlightDTO[];
  cities!: CityDTO[];
  countries!: CountryDTO[];
  filteredFlights!: any[];
  searchStatus: boolean = false;
  validateForm: boolean = false;
  flightStatus: boolean = true;
  valueStatus: boolean = false;
  source!: string;
  destination!: string;
  price!: any;
  reservation_code!: string;
  startDate!: Date;
  endDate!: Date;
  nextFlight!: FlightDTO[];
  heightCaja!: string;
  users: UnregUserDTO;
  booked: boolean = false;
  name: FormControl;
  email: FormControl; 
  user!: UnregUserDTO[];
  userForm: FormGroup;
  usuario!: UserDTO;
  isSignedIn: boolean = false;
  userConfirmado: boolean = false;
  errors: any = null;

  constructor(public flightService: FlightService,
    public router: Router,
    public fb: FormBuilder,
    public headerMenusService: HeaderMenusService,
    private auth: AuthStateService,
    public local: LocalStorageService
    ) {
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
  
  ngOnInit() { 
    this.auth.userAuthState.subscribe((val) => {
      this.userConfirmado = val;
    });
    console.log(this.userConfirmado)

    this.flightService.getFlight().subscribe((flights: FlightDTO[]) => (this.flights = flights));
    this.flightService.getCities().subscribe((cities: CityDTO[]) => (this.cities = cities));
    this.flightService.getCountries().subscribe((countries: CountryDTO[]) => (this.countries = countries));
    this.flightService.getUnregUser().subscribe((users: UnregUserDTO[]) => (this.user = users));
  }
  onChangeSource(newValue:string){ 
    this.source = newValue;
    this.compareValue();
  }
  onChangedestination(newValue:string){ 
    this.destination = newValue;
    this.compareValue();
  }
  compareValue(){
    if (this.source == this.destination) {
      this.valueStatus = true;
    } else {
      this.valueStatus = false;
    }
  }
  change(source: any, destination: any) {
    this.source = destination;
    this.destination = source;
  }
  onSubmit(SearchPara: any) { 
    let retrievedObject = JSON.parse(this.local.getUsuario('usuario') || '{}');
    this.usuario = retrievedObject;
    this.flightStatus = false;
    this.source = SearchPara.source;
    this.destination = SearchPara.destination;
    this.startDate = SearchPara.startDate;
    this.userForm.reset();
    let values = Object.values(this.flights);
    let merged = values.flat(1);
    let listaVuelos = merged.sort((a,b)=>new Date(b.boarding_time).valueOf() - new Date(a.boarding_time).valueOf());
    console.log(listaVuelos) 
   
    if(this.startDate) {
      this.filteredFlights = listaVuelos.filter((x) => {
        return (x.origin == this.source) &&
          (x.boarding_time == this.startDate)
      });
    }
    else {
      this.filteredFlights = listaVuelos.filter((x) => {
        return ((x.origin == this.source) &&
          (x.destination == this.destination)) ||
          (x.boarding_time == this.startDate)
      });
    }
    if(this.filteredFlights.length == 0){
      this.searchStatus = true;
    } else{ 
      this.searchStatus = false;
    }
    if(this.userConfirmado == true && this.filteredFlights.length <= 2) {
      let height = 700;
      for(var i = 0; i < this.filteredFlights.length; i++) {        
        height += 120;    
      }
      this.heightCaja = height.toString() + "px"
    } else if(this.userConfirmado == true && this.filteredFlights.length > 2) {
      let height = 700;
      for(var i = 0; i < this.filteredFlights.length; i++) {        
        height += 140;    
      }
      this.heightCaja = height.toString() + "px"
    } else if(this.filteredFlights.length > 2){
      let height = 1000;
      for(var i = 0; i < this.filteredFlights.length; i++) {        
        height += 360;    
      }
      this.heightCaja = height.toString() + "px"
    } else if(this.filteredFlights.length > 1){
      let height = 1000;
      for(var i = 0; i < this.filteredFlights.length; i++) {        
        height += 240;    
      }
      this.heightCaja = height.toString() + "px"
    } else if(this.filteredFlights.length > 0) {
      this.heightCaja = "1000px";
    }
    this.decideSize()
  }
  biggerDiv() {
    if(this.filteredFlights == undefined) {
      this.heightCaja = "580px";
    } else if(this.filteredFlights.length == 0  && this.searchStatus == true) {
      this.heightCaja = "580px";
    }
  }
  decideSize() {
    if(this.searchStatus == true) {
      this.smallerDiv()
    } else {
      this.biggerDiv()
    }
  }
  smallerDiv() {
    if(this.filteredFlights == undefined) {
      this.heightCaja = "450px";
    } else if(this.filteredFlights.length == 0 && this.searchStatus == true) {
      this.heightCaja = "500px"; 
    } 
  }
  checkUnregUser( ) {
    this.validateForm = true;
    this.booked = true;
    if (this.userConfirmado == true) {
      console.log(this.usuario)
      this.users.email = this.usuario.email;
      this.users.name = this.usuario.name;
    } else {
      this.users.email = this.email.value;
      this.users.name = this.name.value;
      this.users = this.userForm.value;
      this.flightService.createUnregUser(this.users)
        .subscribe((result) => {
          console.log(result);
          this.userConfirmado = true;
          let height = 700;
      for(var i = 0; i < this.filteredFlights.length; i++) {        
        height += 160;    
      }
      this.heightCaja = height.toString() + "px"
        },
        (error) => {
          this.errors = error.error;
          this.userConfirmado = false;
        })
    }
    console.log(this.users);
    if(this.filteredFlights.length > 1 && this.userConfirmado == true){
      let height = 700;
      for(var i = 0; i < this.filteredFlights.length; i++) {        
        height += 120;    
      }
      this.heightCaja = height.toString() + "px"
    } else if(this.filteredFlights.length > 0 && this.userConfirmado == true) {
      this.heightCaja = "700px";
    }
    this.local.setUsuario( 'usuario',JSON.stringify(this.users));  
  }
  setFlight(flight: any) {
    this.checkUnregUser(); 
    this.local.setUsuario('flight', JSON.stringify(flight)) 
  }   
}