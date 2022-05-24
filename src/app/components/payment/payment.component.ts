import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMonth, IPaymentModel, IYear } from 'src/app/Models/payment.interface';
import { getValidationConfigFromCardNo } from 'src/app/shared/Helpers/getvalidationcard.helper';
import { ViewChild, ElementRef } from '@angular/core';
import { ReservationDTO } from 'src/app/Models/reservation.dto';
import { FlightService } from 'src/app/shared/Services/flight.service';

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
  creditCardTypes = [
    "Visa",

    "AmericanExpress",

    "Maestro",

    "Discover",

    "MasterCard"
]

  selectedValue: FormControl; 
  public constructor( private formBuilder: FormBuilder, public flightService: FlightService) {
    this.name = new FormControl('', [Validators.required]);
    this.cardNumber = new FormControl('', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(17)]);
    this.expiryMonth = new FormControl("", Validators.required);
    this.expiryYear = new FormControl("", Validators.required);
    this.selectedValue = new FormControl("", Validators.required)
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
    this.reservation = this.flightService.getDataReservation();
    console.log(this.reservation)
  }
  get f() {
    return this.paymentForm.controls;
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
  SaveCardDetails(){    
    this.isSubmitted= true;
    this.paymentmodel.fullName = this.name.value; 
    this.paymentmodel.cardNumber = this.cardNumber.value; 
    this.paymentmodel.cardMonth = this.expiryMonth.value;
    this.paymentmodel.cardYear = this.expiryYear.value;  
    this.paymentmodel.cvc = this.cvc.value; 
    this.paymentmodel.cardType = this.selectedValue.value
    if(this.paymentForm.valid){
      this.cardDetailsValidate = true;
      this.flightService.setDataReservation(this.reservation);
      this.flightService.createReservation(this.reservation)
    .subscribe()
      console.log(this.paymentmodel)
    }
    else {
      console.log('error')
    }
  }

  ClearCardDetails(){
    this.paymentmodel = <IPaymentModel>{};
    this.paymentForm.reset();
  }
}
