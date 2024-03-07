import { Component, AfterViewInit, Renderer2, OnInit } from '@angular/core';
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
	selector: 'app-danshop-menu',
	templateUrl: './danshop-menu.component.html',
	styleUrls: ['./danshop-menu.component.css']
})
export class DanshopMenuComponent implements OnInit {

    constructor(private renderer: Renderer2) {}
	
	ngOnInit(): void {
	
	    // sidebar open close js code
		let navLinks = document.querySelector(".nav-links") as HTMLElement;
		let menuOpenBtn = document.querySelector(".navbar .bx-menu") as HTMLElement;
		let menuCloseBtn = document.querySelector(".nav-links .bx-x") as HTMLElement;
		
		if (menuOpenBtn) {
		  menuOpenBtn.addEventListener('click', () => {
			if (navLinks) {
			  navLinks.style.left = "0";
			}
		  });
		}		

		if (menuCloseBtn) {
		  menuCloseBtn.addEventListener('click', () => {
			if (navLinks) {
			  navLinks.style.left = "-100%";
			}
		  });
		}

		$(".htmlcss-arrow").click((event: MouseEvent) => {
			let siblings = $(event.currentTarget).siblings(".htmlCss-sub-menu");
			siblings.toggle();
		});

		$(".more-arrow").click((event: MouseEvent) => {
			let siblings = $(event.currentTarget).siblings(".more-sub-menu");
			siblings.toggle();
		});
	}
}
