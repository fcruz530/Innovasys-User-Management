import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      this.authService.isLoggedIn = true;
    }
  }

}
