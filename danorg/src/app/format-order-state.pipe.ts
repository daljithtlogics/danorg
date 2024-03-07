import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatOrderState'
})
export class FormatOrderStatePipe implements PipeTransform {

  transform(value: string): string {
    // Split the string by capital letters to separate words, then capitalize the first letter of each word
    return value.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

}