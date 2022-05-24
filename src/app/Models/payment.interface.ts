export interface IPaymentModel{
    fullName:string;
    cardNumber: any;
    cardMonth: any;
    cardYear:any;
    cvc:string;
    cardType:string;
}

export interface IMonth {
    text: string,
    value: string,
}

export interface IYear {
    text: string,
    value: string,
}