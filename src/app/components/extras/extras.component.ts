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
    this.suitcase = 50;
    this.activities = 25;
    this.pickup = 20;
  }

  ngOnInit(): void {
    let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
  }
  back(): void {
    this.location.back()
  }
  buyPickup() {
    this.reservation.price = this.reservation.price + this.pickup;
    this.bought = true;
    this.openSnackBar('Se ha añadido correctamente', undefined, 'snackbar' )
  }
  buyActivities() {
    this.reservation.price = this.reservation.price + this.activities;
    this.bought = true;
    this.openSnackBar('Se ha añadido correctamente', undefined, 'snackbar' )
  }
  buySuitcase() {
    this.reservation.price = this.reservation.price + this.suitcase;
    this.bought = true;
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
