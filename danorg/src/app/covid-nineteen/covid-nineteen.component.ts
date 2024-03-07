import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-covid-nineteen',
  templateUrl: './covid-nineteen.component.html',
  styleUrls: ['./covid-nineteen.component.css']
})
export class CovidNineteenComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    const script = this.renderer.createElement('script');
	script.src = 'https://apps.elfsight.com/p/platform.js';
	script.defer = true;
	this.renderer.appendChild(document.body, script);
  }
}
