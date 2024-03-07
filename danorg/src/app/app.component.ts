import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'my-app';
	loading = false;

	constructor(private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.loading = true;
			} else if (event instanceof NavigationEnd) {
				this.loading = false;
			}
		});
	}
}