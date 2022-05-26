import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
import { ReservationDTO } from 'src/app/Models/reservation.dto';

@Component({
  selector: 'app-boarding-pass',
  templateUrl: './boarding-pass.component.html',
  styleUrls: ['./boarding-pass.component.css']
})
export class BoardingPassComponent implements OnInit {
  reservation!: ReservationDTO;
  gate!: string;
  public myAngularxQrCode: any = null;

  constructor(private location: Location,  public local: LocalStorageService) {
    this.myAngularxQrCode = 'tutsmake.com';
  }

  ngOnInit(): void {
    let retrievedFlight = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedFlight;

    let string =  this.reservation.boarding_hour.toString();
    let string2 = string.slice(0, -3);
    this.reservation.boarding_hour = string2;
    this.gate = JSON.parse(this.local.getUsuario('gate') || '{}')

  }
  back(): void {
    this.location.back()
  }
}
