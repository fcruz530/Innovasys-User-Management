import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes(environment.serverDomain)) {
      // Get the auth token from the service.
      const authToken = 'Bearer ' + this.authService.authorizationToken;

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      req = req.clone({ setHeaders: { Authorization: authToken } });
    }
    return next.handle(req);
  }
}
