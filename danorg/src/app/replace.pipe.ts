import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
	transform(value: number | string): string {
		if (typeof value !== 'number') {
		  value = parseFloat(value.replace(/,/g, ''));
		}
		return value.toFixed(2);
	}
}