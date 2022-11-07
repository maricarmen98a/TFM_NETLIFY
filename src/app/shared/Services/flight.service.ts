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

  getFlight(): Observable<any> {
    return this.http.get<FlightDTO[]>('https://stark-sands-97153.herokuapp.com/api/flights').pipe(catchError(this.handleError));
  }
  getReservation(): Observable<any> {
    return this.http.get<ReservationDTO[]>('https://stark-sands-97153.herokuapp.com/api/reservations').pipe(catchError(this.handleError));
  }
  getUnregUser(): Observable<any> {
    return this.http.get<UnregUserDTO[]>('  https://stark-sands-97153.herokuapp.com/api/unreguser').pipe(catchError(this.handleError));
  }
  createUnregUser(data: any): Observable<any> {
    return this.http.post('https://stark-sands-97153.herokuapp.com/api/unreguser', data)
  }
  createReservation(data:any): Observable<any> {
    return this.http.post('https://stark-sands-97153.herokuapp.com/api/reservations', data)
  }
  updateReservation(data:any, id:any): Observable<any> {
    return this.http.put('https://stark-sands-97153.herokuapp.com/api/reservations/'+ id, data)
  }
  getCities(): Observable<any> {
    return this.http.get<CityDTO[]>('https://stark-sands-97153.herokuapp.com/api/cities');
  }
  getCountries(): Observable<any> {
    return this.http.get<CountryDTO[]>('https://stark-sands-97153.herokuapp.com/api/countries');
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
