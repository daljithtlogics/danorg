import { Component, AfterViewInit, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-dansadansaorg',
  templateUrl: './dansadansaorg.component.html',
  styleUrls: ['./dansadansaorg.component.css']
})
export class DansadansaorgComponent implements AfterViewInit {
	constructor(private renderer: Renderer2) {}
	ngAfterViewInit() {
		const script = this.renderer.createElement('script');
		script.src = 'https://apps.elfsight.com/p/platform.js';
		script.defer = true;
		this.renderer.appendChild(document.body, script);
	}
}
