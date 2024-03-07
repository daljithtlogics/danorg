import { SharedModule } from '@vendure/admin-ui/core';
import { Component } from '@angular/core';

@Component({
    selector: 'memberships',
    template: `
        <vdr-page-block>
            <h2>{{ greeting }}</h2>
        </vdr-page-block>`,
    standalone: true,
    imports: [SharedModule],
})
export class MembershipsComponent {
    greeting = 'Hello!';
}