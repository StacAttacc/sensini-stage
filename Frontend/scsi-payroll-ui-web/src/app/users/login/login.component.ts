import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
              private cookieSerice: CookieService){}

  setToken(token: string): void{
    this.cookieSerice.set("Authorization", token);
  }

  getToken(): string{
    return this.cookieSerice.get("Authorization");
  }

  onSubmit(){
    if (this.loginForm.valid){
      let email = this.loginForm.value.email?? '';
      let password = this.loginForm.value.password?? '';

      this.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log("success ", userCredential);
          let theUser = userCredential.user;
          theUser?.getIdToken(/*Force refresh*/ true)
            .then(function(idToken){
              console.log("theToken ", idToken);
            })
            .catch(function(userError){
              console.log("userError", userError);
            });
        })
        .catch(error => {
          console.log("error ", error);
        });
    }
  }
}
