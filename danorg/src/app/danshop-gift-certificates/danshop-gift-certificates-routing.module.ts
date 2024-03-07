import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanshopGiftCertificatesComponent } from './danshop-gift-certificates.component';

const routes: Routes = [
	{
		path: "",
		component: DanshopGiftCertificatesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanshopGiftCertificatesRoutingModule { }
