export class ReservationDTO {
    id: number;
    user_id: number;
    booking_id: number;
    flight_id: number;
    passenger_name: string;
    passenger_email: string;
    status: string;
    airline: string;
    origin: string;
    destination: string;
    price: number;
    seat: string;
    reservation_code: string;
  
    constructor(
        id: number,
        user_id: number,
        booking_id: number,
        flight_id: number,
        passenger_name: string,
        passenger_email: string,
        status: string,
        airline: string,
        origin: string,
        destination: string,
        price: number,
        seat: string,
        reservation_code: string
    ) {
        this.id = id,
        this.user_id = user_id,
        this.booking_id = booking_id,
        this.flight_id = flight_id,
        this.passenger_name = passenger_name,
        this.passenger_email = passenger_email,
        this.status = status,
        this.airline = airline,
        this.origin = origin,
        this.destination = destination,
        this.price = price,
        this.seat = seat,
        this.reservation_code = reservation_code
    }
  }
  