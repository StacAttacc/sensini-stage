import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';
import { getAuth, GoogleAuthProvider, signInWithPopup, getIdToken, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth;

  constructor(private cookieService: CookieService) {
    const app = initializeApp({
      apiKey: "AIzaSyBWZyARd11xBPDkWYLyrKMvT0Xhnj-kxu4",
      authDomain: "scsincpr.firebaseapp.com",
      projectId: "scsincpr",
      storageBucket: "scsincpr.appspot.com",
      messagingSenderId: "366822093486",
      appId: "1:366822093486:web:25a7ff2874f79b9498733f",
      measurementId: "G-Q3VM4EX1LE"
    });
    this.auth = getAuth(app);
  }

  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return this.AuthLogin(provider);
  }

  AuthLogin(provider:any) {
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('You have been successfully logged in!')

        const user = result.user;
        console.log('Display Name: ' + user.displayName);

        getIdToken(user).then((idToken) => {
          console.log('ID Token: ' + idToken);
          this.cookieService.set("Autorization", idToken);
        });

      }).catch((error) => {
        console.log(error)
      })
  }

  SignOut() {
    return signOut(this.auth).then(() => {
      this.cookieService.delete("Autorization");
      console.log('Sign out successful')
    })
  }

  getToken(){
    return this.cookieService.get("Autorization");
  }
}
