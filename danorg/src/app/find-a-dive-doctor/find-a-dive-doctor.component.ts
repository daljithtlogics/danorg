import { Component, AfterViewInit, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-find-a-dive-doctor',
  templateUrl: './find-a-dive-doctor.component.html',
  styleUrls: ['./find-a-dive-doctor.component.css']
})
export class FindADiveDoctorComponent {
	constructor(private renderer: Renderer2) {}
	ngAfterViewInit() {
		const script = this.renderer.createElement('script');
		script.src = 'https://apps.elfsight.com/p/platform.js';
		script.defer = true;
		this.renderer.appendChild(document.body, script);
	}
}
