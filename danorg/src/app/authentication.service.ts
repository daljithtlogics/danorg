// authentication.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated: boolean = false;
  private userId: number | null = null;
  private userEmail: string | null = null;
  private userMembership: string | null = null;
  private authToken: string | null = null;
  private userAccess: string | null = null;     
  private userPack: string | null = null;  
  private userRenew: string | null = null;     


  constructor() {
    // Check session storage on service initialization
    this.checkSessionStorage();
  }
  checkSessionStorage(): void {
    const storedUserId = sessionStorage.getItem('userId');
    const storedEmail = sessionStorage.getItem('userEmail');  
    const storedMembership = sessionStorage.getItem('userMembership');
	  const storedAccess = sessionStorage.getItem('userAccess');    
    const storedToken = sessionStorage.getItem('authToken');  	
	  const storedPack = sessionStorage.getItem('userPack');  
	  const storedRenew = sessionStorage.getItem('userRenew');  


    if (storedUserId && storedEmail && storedMembership && storedToken) {
      this.userId = +storedUserId;
      this.userEmail = storedEmail;
      this.userMembership = storedMembership;  
      this.userAccess = storedAccess;    
      this.userPack = storedPack;      	
      this.authToken = storedToken;
      this.isAuthenticated = true;
      this.userRenew = storedRenew;      	
    }
  }

  login(userId: number, email: string, membership: string,access: string,pack: string, renew: string) {
    // Generate a random token
    const token = this.generateRandomToken();  

    // Set isAuthenticated to true upon successful login  
    this.isAuthenticated = true;
    this.userEmail = email;
    this.userMembership = membership;	
    this.userAccess = access;    
    this.userPack = pack;      
    this.authToken = token;
    this.userRenew = renew;      

    // Store in sessionStorage
    sessionStorage.setItem('userId', userId.toString());
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userMembership', membership);
	  sessionStorage.setItem('userAccess', access);    
    sessionStorage.setItem('authToken', token);
	  sessionStorage.setItem('userPack', pack);      
	  sessionStorage.setItem('userRenew', renew);      
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  private generateRandomToken(): string {
    const tokenLength = 32; // Adjust the length of the token as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  }


  logout() {
    // Implement your logout logic here
    // Set isAuthenticated to false upon logout
    this.isAuthenticated = false;
    this.userId = null;
    this.userEmail = null;
    this.userMembership = null;
	this.userAccess = null;
	this.userPack = null;    
    this.authToken = null;

    // Clear sessionStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');  
    sessionStorage.removeItem('userAccess');     
	sessionStorage.removeItem('userPack');   
	sessionStorage.removeItem('userMembership');    
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    console.log('Checking authentication status:', this.isAuthenticated);
    return this.isAuthenticated;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getUserMembership(): string | null {
    return this.userMembership;	
  }
  
  getUserAccess(): string | null {
    return this.userAccess;      
  }
  
  getUserPack(): string | null {
    return this.userPack;            
  }

  getAuthToken(): string | null {
    return this.authToken;
  }   
  
  getUserRenew(): string | null {
    return this.userRenew;            
  }

}
