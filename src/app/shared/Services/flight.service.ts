import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FlightDTO } from '../../Models/flight';
import { CityDTO } from '../../Models/city';
import { CountryDTO } from 'src/app/Models/country';
import { throwError } from 'rxjs';
import { UnregUserDTO } from 'src/app/Models/unregisteredUser';
import { ReservationDTO } from 'src/app/Models/reservation.dto';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flights!: FlightDTO;

  constructor(private http: HttpClient) { }
  baseUrl = 'https://stark-sands-97153.herokuapp.com/api';
  getFlight(): Observable<any> {
    return this.http.get<FlightDTO[]>(this.baseUrl + '/flights').pipe(catchError(this.handleError));
  }
  getReservation(): Observable<any> {
    return this.http.get<ReservationDTO[]>(this.baseUrl + '/reservations').pipe(catchError(this.handleError));
  }
  getUnregUser(): Observable<any> {
    return this.http.get<UnregUserDTO[]>(this.baseUrl + '/unreguser').pipe(catchError(this.handleError));
  }
  createUnregUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/unreguser', data)
  }
  createReservation(data:any): Observable<any> {
    return this.http.post(this.baseUrl + '/reservations', data)
  }
  updateReservation(data:any, id:any): Observable<any> {
    return this.http.put(this.baseUrl + '/reservations/'+ id, data)
  }
  getCities(): Observable<any> {
    return this.http.get<CityDTO[]>(this.baseUrl + '/cities');
  }
  getCountries(): Observable<any> {
    return this.http.get<CountryDTO[]>(this.baseUrl + '/countries');
}

private handleError(err: HttpErrorResponse) {
  let errMsg:string='';
  if (err.error instanceof Error) {
    console.log('An error occurred:', err.error.message);
    let errMsg=err.error.message;} 
    else {
    console.log(`Backend returned code ${err.status}`);
    let errMsg=err.error.status;
   }
    return throwError(() => errMsg); 
}
}
