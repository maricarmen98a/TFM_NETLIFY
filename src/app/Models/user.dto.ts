export class UserDTO {
    id?: string;
    access_token?: string;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    constructor(
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
  }