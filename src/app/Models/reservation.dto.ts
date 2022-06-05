export interface TimeFlight {
    hours: Number,
    minutes: Number,
    seconds: Number
}
export class ReservationDTO {
    id: number;
    user_id: number;
    flight_id: number;
    passenger_name: string;
    passenger_email: string;
    passenger_passport: string;
    passenger_phone: string;
    airline: string;
    origin: string;
    destination: string;
    price: number;
    seat: string;
    reservation_code: string;
    boarding_time: Date;
    arrival_time: Date;
    boarding_hour: string;
    arrival_hour: string;
  
    constructor(
        id: number,
        user_id: number,
        flight_id: number,
        passenger_name: string,
        passenger_email: string,
        passenger_passport: string,
        passenger_phone: string,
        airline: string,
        origin: string,
        destination: string,
        price: number,
        seat: string,
        reservation_code: string,
        boarding_time: Date,
        arrival_time: Date,
        boarding_hour: string,
        arrival_hour: string
    ) {
        this.id = id,
        this.user_id = user_id,
        this.flight_id = flight_id,
        this.passenger_name = passenger_name,
        this.passenger_email = passenger_email,
        this.passenger_passport = passenger_passport,
        this.passenger_phone = passenger_phone,
        this.airline = airline,
        this.origin = origin,
        this.destination = destination,
        this.price = price,
        this.seat = seat,
        this.reservation_code = reservation_code,
        this.boarding_time = boarding_time,
        this.boarding_hour = boarding_hour,
        this.arrival_hour = arrival_hour,
        this.arrival_time = arrival_time
    }
  }
  