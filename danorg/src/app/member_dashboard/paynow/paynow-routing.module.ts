import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';       
import { PaynowComponent } from './paynow.component';					
const routes: Routes = [
	{
		path:"",
		component:PaynowComponent			
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]				
})
export class PaynowComponentRoutingModule { }				
