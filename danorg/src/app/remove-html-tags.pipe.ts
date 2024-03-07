import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlTags'
})
export class RemoveHtmlTagsPipe implements PipeTransform {
  transform(value: string): string {
    const regex = /(<([^>]+)>)/gi;
    return value.replace(regex, '');
  }
}