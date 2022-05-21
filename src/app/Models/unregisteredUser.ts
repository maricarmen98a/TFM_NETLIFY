export interface UserInterface {
    name: string;
    email: string;
  }

export class UnregUserDTO {
    name: string;
    email: string;
   
    constructor(
        name: string,
        email: string,
      
    ) {
        this.name = name;
        this.email = email;
       
    }
  }