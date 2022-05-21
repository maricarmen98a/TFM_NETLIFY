import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDigits'
})


export class RemoveDigitsPipe implements PipeTransform {
  /* transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  } */
  transform(value: any, ...args: any[]) {
    let str = value.toString();
    str = str.slice(0, -3);
    return str;
  }
  
}