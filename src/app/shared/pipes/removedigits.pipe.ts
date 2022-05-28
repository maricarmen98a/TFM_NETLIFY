import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDigits'
})


export class RemoveDigitsPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    let str = value.toString();
    str = str.slice(0, -3);
    return str;
  }
  
}