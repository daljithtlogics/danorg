import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit {
  loading = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
	  this.cdr.detectChanges(); // Manually trigger change detection
    });
  }
}
