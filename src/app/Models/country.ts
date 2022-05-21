export class CountryDTO {
    name: string;
    country_code: string;
  
    constructor(
        name: string,
        country_code: string,
    ) {
      this.name = name;
      this.country_code = country_code;
    }
  }
  