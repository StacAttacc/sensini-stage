import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginService } from './payroll-api-proxy';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SecurityTokenInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService,
              private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes('/api/users/login')){
      return next.handle(request).pipe(
        tap(event => {
          if(event instanceof HttpResponse){
            const decodedToken = event.body;
            this.cookieService.set('token', decodedToken);
          }
        })
      )
    }

    return next.handle(request);
  }
}
