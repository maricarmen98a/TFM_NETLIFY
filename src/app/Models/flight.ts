export class FlightDTO {
    flight_number: string;
    destination: string;
    arrival_time: Date;
    origin: string;
    boarding_time: Date;
    boarding_hour: Date;
    arrival_hour: Date;
    reservation_code: string;
    price: number;
  
    constructor(
        flight_number: string,
        destination: string,
        arrival_time: Date,
        origin: string,
        boarding_time: Date,
        boarding_hour: Date,
        arrival_hour: Date,
        reservation_code: string,
        price: number
    ) {
      this.flight_number = flight_number;
      this.destination = destination;
      this.arrival_time = arrival_time;
      this.origin = origin;
      this.boarding_time = boarding_time;
      this.boarding_hour = boarding_hour;
      this.arrival_hour = arrival_hour;
      this.reservation_code = reservation_code;
      this.price = price;
    }
  }
  