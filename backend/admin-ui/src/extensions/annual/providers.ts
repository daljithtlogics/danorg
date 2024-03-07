import { addNavMenuSection } from '@vendure/admin-ui/core';

export default [
    addNavMenuSection({
        id: 'memberships',
        label: 'Memberships',
        items: [
		{
            id: 'annual',
            label: 'Annual',
            routerLink: ['/extensions/memberships/annual'],
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'cursor-hand-open',
        },
		{
            id: 'temporary',
            label: 'Temporary',
            routerLink: ['/extensions/memberships/temporary'],
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'cursor-hand-open',
        },
		{
            id: 'student',
            label: 'Student',
            routerLink: ['/extensions/memberships/student'],
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'cursor-hand-open',
        },
		{
            id: 'partner',
            label: 'Partner',
            routerLink: ['/extensions/memberships/partner'],
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'cursor-hand-open',
        },
		{
            id: 'commercial',
            label: 'Commercial',
            routerLink: ['/extensions/memberships/commercial'],
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'cursor-hand-open',
        }
		],

    },
    // Add this section before the "settings" section
    'settings'),
];