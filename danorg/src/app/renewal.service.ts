
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RenewalService {
  private renewFlag: boolean = false;

  setRenewFlag(value: boolean): void {
    this.renewFlag = value;
  }

  getRenewFlag(): boolean {
    return this.renewFlag;
  }
}
