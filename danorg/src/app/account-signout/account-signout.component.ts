import { Component, OnInit } from '@angular/core';
import { SignOut } from '../types';
import { SIGIN_OUT } from '../documents.graphql';
import { StateService } from '../state.service';
import { gql, Apollo } from "apollo-angular";
import { Observable } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
	selector: 'app-account-signout',
	templateUrl: './account-signout.component.html',
	styleUrls: ['./account-signout.component.css']
})
export class AccountSignoutComponent implements OnInit{

    signedIn$!: Observable<boolean>;
	
	constructor(private toastrService: ToastrService, private apollo: Apollo, private stateService: StateService, private router: Router, private route: ActivatedRoute){}
	
	ngOnInit(): void {	
		this.apollo.mutate<SignOut>({
			mutation: SIGIN_OUT,
		})
		.subscribe({
            next: () => {
                this.stateService.setState('signedIn', false);
                /*setTimeout(() => {
					this.router.navigate(['/danshop']);
				}, 5000);*/
            },
        });
	}
	
	
}
