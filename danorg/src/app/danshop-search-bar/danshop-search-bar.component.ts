import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-danshop-search-bar',
  templateUrl: './danshop-search-bar.component.html',
  styleUrls: ['./danshop-search-bar.component.css']
})
export class DanshopSearchBarComponent implements OnInit, OnDestroy {

    @Input() autoSearch = false;

    //searchTerm = new UntypedFormControl('');
	searchTerm: FormControl = new FormControl('');
    private subscription!: Subscription;

    constructor(private route: ActivatedRoute, private router: Router) { }
	
	ngOnInit() {
        if (this.autoSearch) {
            this.subscription = this.searchTerm.valueChanges.pipe(
                debounceTime(250),
            ).subscribe(term => this.doSearch());
        }
    }

	doSearch() {
	    const searchValue = this.searchTerm.value;
        this.router.navigate(['/danshop/search'], {
            queryParams: { search: searchValue },
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
        this.searchTerm.setValue('', { emitEvent: false });
    }
	

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
