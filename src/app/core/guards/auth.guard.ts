import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let allowed = true;
    if (!this.authService.isLoggedIn) {
      allowed = false;
      this.router.navigate(['login']);
    }

    return allowed;
  }
}
