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

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        // Verificando se esta logado ou não, nesse caso o usuario não pode mais acessar a tela de login, pois ja esta logado
        if(user) this.router.navigate(['home']);

        resolve(!user ? true : false);
      })
    });
  }
}
