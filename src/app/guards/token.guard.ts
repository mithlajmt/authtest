import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken'); // Replace 'token' with your actual token key
 

    if(token==null||token=='') {
      return true; 
    }
    if (token) {
      // If token exists, redirect to /user/courses
      this.router.navigate(['/user/courses']);
      return false; // Prevent activation of the current route
    }

    return true; // Allow activation if no token is found
  }
}
