import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Checking if you are logged in or not, if you are not, go back to the login screen
   * @returns boolean
   */
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        // 
        if(!user) this.router.navigate(['login']);

        resolve(user ? true : false);
      })
    });
  }
  
}
