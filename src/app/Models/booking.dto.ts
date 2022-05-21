export interface BookingInterface {
  name: string;
  email: string;
}
export class BookingDTO {
    user_id: number;
    name: string;
    email: string;
    status: string;
    passengers: number;
    airline: string;
    reservation_time: Date;
    origin: string;
    destination: string;
    price: number;
    promo_code: string;
  
    constructor(
        user_id: number,
        name: string,
        email: string,
        status: string,
        passengers: number,
        airline: string,
        reservation_time: Date,
        destination: string,
        origin: string,
        price: number,
        promo_code: string
    ) {
      this.user_id = user_id;
      this.name = name;
      this.email = email;
      this.status = status;
      this.passengers = passengers;
      this.airline = airline;
      this.reservation_time = reservation_time;
      this.destination = destination;
      this.origin = origin;
      this.price = price;
      this.promo_code = promo_code;
    }
  }
  