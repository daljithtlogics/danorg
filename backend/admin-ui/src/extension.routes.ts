export const extensionRoutes = [  {
    path: 'extensions/memberships',
    loadChildren: () => import('./extensions/memberships/routes'),
  },
  {
    path: 'extensions/memberships/student',
    loadChildren: () => import('./extensions/student/routes'),
  },
  {
    path: 'extensions/memberships/temporary',
    loadChildren: () => import('./extensions/temporary/routes'),
  },
  {
    path: 'extensions/memberships/annual',
    loadChildren: () => import('./extensions/annual/routes'),
  },
  {
    path: 'extensions/memberships/commercial',
    loadChildren: () => import('./extensions/commercial/routes'),
  },
  {
    path: 'extensions/memberships/partner',
    loadChildren: () => import('./extensions/partner/routes'),
  },
  {
    path: 'extensions/contacts',
    loadChildren: () => import('./extensions/contacts/routes'),
  },
  {
    path: 'extensions/contacts/orgquery',
    loadChildren: () => import('./extensions/orgquery/routes'),
  },
  {
    path: 'extensions/contacts/shopquery',
    loadChildren: () => import('./extensions/shopquery/routes'),
  }];
