import { Component, OnInit } from '@angular/core';
import { FlightDTO } from 'src/app/Models/flight';
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

  constructor(public flightService: FlightService) { }

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
}
