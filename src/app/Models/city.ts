export class CityDTO {
    name: string;
    city_code: string;
    country_name: string;
    country_code: string;
  
    constructor(
        name: string,
        city_code: string,
        country_name: string,
        country_code: string
    ) {
      this.name = name;
      this.city_code = city_code;
      this.country_name = country_name;
      this.country_code = country_code;
    }
  }
  