import { Component, OnInit } from '@angular/core';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';


@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {
  reservation!: ReservationDTO;
  suitcase: number;
  pickup: number;
  activities: number;
  bought: boolean = false;
  constructor(private location: Location, public local: LocalStorageService, public flightService: FlightService, private _snackBar: MatSnackBar, public router: Router) { 
    this.suitcase = 50.00;
    this.activities = 25.00;
    this.pickup = 20.00;
   /*  let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
    console.log(this.reservation.price + '28') */
  }

  ngOnInit(): void {
    let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
    console.log(this.reservation.price + '28')
   
  }
  back(): void {
    this.location.back()
  }

  buyPickup() {
    let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
    console.log(this.reservation.price + '    28')
    this.reservation.price = this.reservation.price + this.pickup;
    console.log(this.reservation.price + ' total')
    this.bought = true;
   
    this.openSnackBar('Se ha añadido correctamente', undefined, 'snackbar' )
  }
  buyActivities() {
    let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
    console.log(this.reservation.price + '28')
    this.reservation.price = this.reservation.price + this.activities;
    console.log(this.reservation.price + ' total')

    this.bought = true;
    this.local.setUsuario('reserva', JSON.stringify(this.reservation))
    console.log('se ha guardado')
    this.openSnackBar('Se ha añadido correctamente', undefined, 'snackbar' )
  }
  buySuitcase() {
    let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
    console.log(this.reservation.price + '28')
    this.reservation.price = this.reservation.price + this.suitcase;
    console.log(this.reservation.price + ' total')

    this.bought = true;
    console.log(this.reservation.price)
    console.log('this.reservation.price')
    this.local.setUsuario('reserva', JSON.stringify(this.reservation))
    console.log('se ha guardado')
    this.openSnackBar('Se ha añadido correctamente', undefined, 'snackbar' )
    

  }
  openSnackBar(message: string, undefined: string | undefined, className: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: [className]
    });
    

  }
  continue() {
    this.local.setUsuario('reserva', JSON.stringify(this.reservation))
    this.router.navigateByUrl('payment')
  }
}
