import { Component, OnInit } from '@angular/core';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
	selector: 'app-dive-centre-partner-application',
	templateUrl: './dive-centre-partner-application.component.html',
	styleUrls: ['./dive-centre-partner-application.component.css']
})
export class DiveCentrePartnerApplicationComponent implements OnInit{
	ngOnInit(): void {
	
		$(document).ready(() => {
		  $(".form-steps").hide();
		  $("#step_1").show();
		});

		$(".next-btn").click((e: any) => {
			e.preventDefault();
			var id = parseInt($(e.target).attr('data-id'));
			console.log('working');
			console.log(id);
			var next_id = id + 1;
			$(".form-steps").hide();
			$("#step_" + next_id + "").show();
			$('html, body').animate({
			scrollTop: $(".title").offset().top
			}, 100);
		});

		$(".back-btn").click((e: any) => {
			e.preventDefault();
			var id = parseInt($(e.target).attr('data-id'));
			console.log('working');
			console.log(id);
			var next_id = id - 1;
			$(".form-steps").hide();
			$("#step_" + next_id + "").show();
			$('html, body').animate({
			scrollTop: $(".title").offset().top
			}, 100);
		});
		
	}
}
