import { Injectable } from '@angular/core';
import { AUTHENTICATION_DATA } from '../../const/authentication';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  isLoggedIn: boolean = false;
  username: string = AUTHENTICATION_DATA.username;
  password: string = AUTHENTICATION_DATA.password;

  authorizationToken: string = '39d9218739ae6042468b7898132542a04c2d53af0cd9285f4b9655fac9b362a4';
  constructor(private route: ActivatedRoute, private router: Router) { }

  logIn(rememberMe?: boolean): void {
    if (rememberMe) {
      sessionStorage.setItem('isAuthenticated', 'true');
    }

    this.isLoggedIn = true;
    this.router.navigate(['users'], { relativeTo: this.route.parent });
  }

  logOut(): void {
    sessionStorage.removeItem('isAuthenticated');
    this.isLoggedIn = false;
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }
}
