import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationRequestComponent } from './cancellation-request.component';

const routes: Routes = [
	{
		path: "",
		component: CancellationRequestComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CancellationRequestRoutingModule { }
