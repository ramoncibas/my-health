import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Checking if you are logged in or not, in this case the user can no longer access the login screen, as he is already logged in
   * @returns boolean
   */
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {        
        if(user) this.router.navigate(['home']);

        resolve(!user ? true : false);
      })
    });
  }
}
