import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../payroll-api-proxy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              public auth: AngularFireAuth,
              public loginService: LoginService) { }

  login(email: string, password: string){
    let userToken: string;
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log("success ", userCredential);
        let theUser = userCredential.user;
        theUser?.getIdToken(/*Force refresh*/ true)
          .then(function(idToken){
            console.log("theToken ", idToken);
            userToken = idToken;
          })
          .catch(function(userError){
            console.log("userError", userError);
          })
          .finally(() => {
            if(userToken != ''){
              this.backendLogin(userToken);
            }
          });
      })
      .catch(error => {
        console.log("error ", error);
      });
  }
  backendLogin(token: string){
    this.loginService.login(token).subscribe();
  }
}
