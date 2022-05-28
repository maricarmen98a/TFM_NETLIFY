export class UserDTO {
    id: number;
    access_token?: string;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    passport: string;
    phone: string;
    constructor(
        id: number,
        name: string,
        email: string,
        passport: string,
        phone: string,
        password: string,
        password_confirmation: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passport = passport;
        this.phone = phone;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
  }