// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // public signupData: any = {};

  // setSignupData(data: any) {
  //   this.signupData = data;
  // }

  // getSignupData() {
  //   return this.signupData;
  // }
  private storageKey = 'signupData';

  setSignupData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getSignupData(): any {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }
}
