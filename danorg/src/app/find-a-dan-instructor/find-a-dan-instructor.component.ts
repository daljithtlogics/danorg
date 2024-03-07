import { Component, AfterViewInit, Renderer2  } from '@angular/core';

@Component({
	selector: 'app-find-a-dan-instructor',
	templateUrl: './find-a-dan-instructor.component.html',
	styleUrls: ['./find-a-dan-instructor.component.css']
})
export class FindADanInstructorComponent {
	constructor(private renderer: Renderer2) {}
	ngAfterViewInit() {
		const script = this.renderer.createElement('script');
		script.src = 'https://apps.elfsight.com/p/platform.js';
		script.defer = true;
		this.renderer.appendChild(document.body, script);
	}
}
