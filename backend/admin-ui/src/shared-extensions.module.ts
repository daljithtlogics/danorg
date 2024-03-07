import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedProviders_0_0 from './extensions/memberships/providers';
import SharedProviders_1_0 from './extensions/student/providers';
import SharedProviders_2_0 from './extensions/temporary/providers';
import SharedProviders_3_0 from './extensions/annual/providers';
import SharedProviders_4_0 from './extensions/commercial/providers';
import SharedProviders_5_0 from './extensions/partner/providers';
import SharedProviders_6_0 from './extensions/contacts/providers';
import SharedProviders_7_0 from './extensions/orgquery/providers';
import SharedProviders_8_0 from './extensions/shopquery/providers';


@NgModule({
    imports: [CommonModule, ],
    providers: [...SharedProviders_0_0, ...SharedProviders_1_0, ...SharedProviders_2_0, ...SharedProviders_3_0, ...SharedProviders_4_0, ...SharedProviders_5_0, ...SharedProviders_6_0, ...SharedProviders_7_0, ...SharedProviders_8_0],
})
export class SharedExtensionsModule {}
