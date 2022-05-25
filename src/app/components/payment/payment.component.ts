import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMonth, IPaymentModel, IYear } from 'src/app/Models/payment.interface';
import { ViewChild, ElementRef } from '@angular/core';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('ccNumber') ccNumberField!: ElementRef;
  paymentForm!: FormGroup
  monthlist: IMonth[] = [];
  month:IMonth = <IMonth>{}; 
  year:IYear = <IYear>{};  
  years: IYear[] = [];
  paymentmodel:IPaymentModel = <IPaymentModel>{}
  isSubmitted:boolean = false;
  cardDetailsValidate:boolean = false;
  name: FormControl;
  cardNumber: FormControl;
  expiryYear: FormControl;
  expiryMonth: FormControl;
  cvc: FormControl;
  reservation!: ReservationDTO;
  hoursFlight!: any;
  creditCardTypes = [
    "Visa", "AmericanExpress", "Maestro", "Discover", "MasterCard"
  ]
  filteredReservations!: any[];
  reservas!: ReservationDTO[];
  showPrice: boolean = false;
  selectedValue: FormControl; 
  public constructor(private location: Location, public local: LocalStorageService, private formBuilder: FormBuilder, public flightService: FlightService) {
    this.name = new FormControl('', [Validators.required]);
    this.cardNumber = new FormControl('', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(17)]);
    this.expiryMonth = new FormControl("", Validators.required);
    this.expiryYear = new FormControl("", Validators.required);
    this.selectedValue = new FormControl("Visa", Validators.required)
    this.cvc = new FormControl("", [Validators.required, Validators.pattern('^[0-9]{3}$')]);
    this.paymentForm = this.formBuilder.group({  
      name: this.name,
      cardNumber: this.cardNumber,
      expiryMonth: this.expiryMonth,
      expiryYear: this.expiryYear,
      cvc: this.cvc,
      selectedValue: this.selectedValue
    });
  } 
  ngOnInit() {   
    this.GetMonths();
    this.GetYears();
    let retrievedObject = JSON.parse(this.local.getUsuario('reserva') || '{}');
    this.reservation = retrievedObject;
    console.log(this.reservation)
    this.stringToTime();
    this.flightService.getReservation().subscribe((reservations: ReservationDTO[]) => (this.reservas = reservations));
  }

  creditCardNumberSpacing() {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;
    const { cardNumber } = this.paymentForm.controls;

    let trimmedCardNum = cardNumber.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37') 
                       ? [4,6,5] 
                       : [4,4,4,4];
    const numbers: any[] = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })
    cardNumber.setValue(numbers.join(' '));
    if (selectionStart < cardNumber.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }
  GetMonths() {
    for (let i = 1; i <= 12; i++) {
      this.month = <IMonth>{};
      if(i.toString().length == 1)
      {
        this.month.text = "0"+i.toString();
        this.month.value = "0"+i.toString();
      }
      else
      {
        this.month.text = i.toString();
        this.month.value = i.toString();
      }
      this.monthlist.push(this.month);
    }
  }
  GetYears() {
    let year = new Date().getFullYear();
    for (let i = year; i <= year + 20; i++) {
      this.year = <IYear>{};
      this.year.text = i.toString();
      this.year.value = i.toString();
      this.years.push(this.year);
    }
  }

  selected(){
    console.log(this.selectedValue.value)
  }
  stringToTime() {
    var origStr = this.reservation.boarding_hour;
    var n = origStr.search(":");
    var hrPart = origStr.substring(0, n);
    var str = origStr.substring(n + 1, origStr.length);
    var n = str.search(":");
    var minPart = str.substring(0, 2);
    var str = str.substring(n + 1, str.length);
    var n = str.search(":");

    var origStr2 = this.reservation.arrival_hour;
    var n2 = origStr2.search(":");
    var hrPart2 = origStr2.substring(0, n2);
    var str2 = origStr2.substring(n2 + 1, origStr2.length);
    var n2 = str2.search(":");
    var minPart2 = str2.substring(0, 2);
    var str2 = str2.substring(n + 1, str2.length);
    var n2 = str2.search(":");

    let hours = parseInt(hrPart2) - parseInt(hrPart);
    let minutes;
    if(minPart2> minPart) {
      minutes = parseInt(minPart2) - parseInt(minPart);
      let horas = hours.toString();
      let minutos = minutes.toString();
      if(horas == '0'){
        console.log(minutos + ' minutos');
        this.hoursFlight = minutos + ' minutos';
      } else {
        console.log(horas, ' horas', minutos, ' minutos')
        this.hoursFlight = horas + ' horas ' + minutos + ' minutos';
      }
    } else if(minPart> minPart2) {
      minutes = 60 - parseInt(minPart) + parseInt(minPart2); 
      hours = hours - 1;
      let horas = hours.toString();
      let minutos = minutes.toString();
      if(horas == '0'){
        console.log(minutos + ' minutos');
        this.hoursFlight = minutos + ' minutos';
      } else {
        console.log(horas, ' horas', minutos + ' minutos')
        this.hoursFlight = horas + ' horas ' + minutos + ' minutos';
      }
    }
  }
  checkIfExists() {
    this.showPrice = true;
    let values = Object.values(this.reservas);
    let merged = values.flat(1);
    console.log(merged) 
    this.reservas = merged.filter((x) => {
      return (x.reservation_code == this.reservation.reservation_code)
    })
    console.log(this.reservas, 'existe!')
    if(this.reservation.price > this.reservas[0].price) {
      this.reservation.price = this.reservation.price - this.reservas[0].price;
    }
    
    console.log(this.reservation.price)
  }
  SaveCardDetails(){    
    this.isSubmitted = true;
    this.paymentmodel.fullName = this.name.value; 
    this.paymentmodel.cardNumber = this.cardNumber.value; 
    this.paymentmodel.cardMonth = this.expiryMonth.value;
    this.paymentmodel.cardYear = this.expiryYear.value;  
    this.paymentmodel.cvc = this.cvc.value; 
    this.paymentmodel.cardType = this.selectedValue.value;
    if(this.paymentForm.valid){
      this.cardDetailsValidate = true;
      this.flightService.createReservation(this.reservation)
    .subscribe()
/*     this.flightService.setDataReservation(this.reservation)
 */    this.local.setUsuario('reserva', JSON.stringify(this.reservation))

      console.log(this.paymentmodel)
    }
    else {
      console.log('error')
    }
  }
  back(): void {
    this.location.back()
  }
  ClearCardDetails(){
    this.paymentmodel = <IPaymentModel>{};
    this.paymentForm.reset();
  }
}
