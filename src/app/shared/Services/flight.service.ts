import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FlightDTO } from '../../Models/flight';
import { CityDTO } from '../../Models/city';
import { CountryDTO } from 'src/app/Models/country';
import { throwError } from 'rxjs';
import { BookingDTO } from 'src/app/Models/booking.dto';
import { UnregUserDTO } from 'src/app/Models/unregisteredUser';
import { ReservationDTO } from 'src/app/Models/reservation.dto';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flights!: FlightDTO;

  constructor(private http: HttpClient) { }

  getFlight(): Observable<any> {
    return this.http.get<FlightDTO[]>('http://127.0.0.1:8000/api/flights').pipe(
     /*  tap(data => console.log('Data fetched:'+JSON.stringify(data))) ,*/
      catchError(this.handleError));
  }
  getBooking(): Observable<any> {
    return this.http.get<BookingDTO[]>('http://127.0.0.1:8000/api/bookings').pipe(
     /*  tap(data => console.log('Data fetched:'+JSON.stringify(data))) ,*/
      catchError(this.handleError));
  }
  getReservation(): Observable<any> {
    return this.http.get<ReservationDTO[]>('http://127.0.0.1:8000/api/reservations').pipe(
     /*  tap(data => console.log('Data fetched:'+JSON.stringify(data))) ,*/
      catchError(this.handleError));
  }
  getUnregUser(): Observable<any> {
    return this.http.get<UnregUserDTO[]>('  http://127.0.0.1:8000/api/unreguser').pipe(
     /*  tap(data => console.log('Data fetched:'+JSON.stringify(data))) ,*/
      catchError(this.handleError));
  }
  createUnregUser(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/unreguser', data)
  }
  createBooking(data:any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/bookings', data)
  }
  createReservation(data:any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/reservations', data)
  }
  getCities(): Observable<any> {
    return this.http.get<CityDTO[]>('http://127.0.0.1:8000/api/cities');
  }
  getCountries(): Observable<any> {
    return this.http.get<CountryDTO[]>('http://127.0.0.1:8000/api/countries');
}
// Sirve para transferir datos entre componentes
private data:any = undefined;
private dataFlight:any = undefined;
private dataBooking:any = undefined;
private dataReservation:any = undefined;
setData(data:any){
  this.data = data;
}
getData():any{
  return this.data;
}
setDataFlight(data:any){
  this.dataFlight = data;
}
getDataFlight():any{
  return this.dataFlight;
}
setDataBooking(data:any){
  this.dataBooking = data;
}
getDataBooking():any{
  return this.dataBooking;
}
setDataReservation(data:any){
  this.dataReservation = data;
}
getDataReservation():any{
  return this.dataReservation;
}


private handleError(err: HttpErrorResponse) {
  let errMsg:string='';
  if (err.error instanceof Error) {
     // A client-side or network error occurred. Handle it accordingly.
     console.log('An error occurred:', err.error.message);
     let errMsg=err.error.message;} 
     else {
     console.log(`Backend returned code ${err.status}`);
       let errMsg=err.error.status;
   }
      return throwError(() => errMsg); 
}
}
