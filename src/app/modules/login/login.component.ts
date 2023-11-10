import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AUTHENTICATION_DATA } from 'src/app/core/const/authentication';
import { SOURCES } from 'src/app/core/const/sources';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rememberMe: new FormControl(false, {nonNullable: true})
  });

  controls = this.loginForm.controls;
  authentication = AUTHENTICATION_DATA;
  logo = SOURCES.innovasystLogoSource;
  hidePassword: boolean = true;
  constructor(private authService: AuthenticationService) {}

  login() {
    const { username, password, rememberMe } = this.loginForm.getRawValue();

    if (username?.trim() !== this.authentication.username || password?.trim() !== this.authentication.password) {
      alert('Invalid credentials!');
      return;
    }

    this.authService.logIn(rememberMe);
  }
}
