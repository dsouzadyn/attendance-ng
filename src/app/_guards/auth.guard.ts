import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {

  }
  canActivate() {
    // if(localStorage.getItem('currentUser')) {
    //   return true;
    // }
    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }

  }
}
