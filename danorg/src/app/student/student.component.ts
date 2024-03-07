import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  constructor(private router: Router, private dataService: DataService) {}

  signup(membership: string, packageName: string, packagePrice: string, packageFor: string) {
    const data = {
      membership: membership,
      packageName: packageName,
      packagePrice: packagePrice,
      packageFor: packageFor
    };

    this.dataService.setSignupData(data);
    const currentUrl = this.router.url;
    const dynamicUrl = `${currentUrl}-application`;
    this.router.navigate([dynamicUrl]);
  }

}
