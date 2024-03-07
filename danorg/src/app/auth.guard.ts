// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('AuthGuard canActivate called');
    
    // Check session storage
    this.authService.checkSessionStorage();

    if (this.authService.isLoggedIn()) {
      console.log('User is authenticated, allowing access to the route');
      return true;
    } else {
      console.log('User is not authenticated, redirecting to login page');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
