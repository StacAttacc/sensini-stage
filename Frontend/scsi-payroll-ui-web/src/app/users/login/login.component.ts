import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public auth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private cookieSerice: CookieService,
              public authService: AuthService){}

  login(){
    return this.authService.GoogleAuth();
  }

  logout(){
    return this.authService.SignOut();
  }

}
