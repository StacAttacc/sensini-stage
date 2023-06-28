import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { NotificationServiceService } from './notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(private notificationService: NotificationServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.extractErrorMessage(error.error).pipe(
          tap(e => {
            this.notificationService.showError(e.message);
          })
        )
      })
    );
  }

  private extractErrorMessage(error: any): Observable<any> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const jsonObject = JSON.parse(text);
        observer.next(jsonObject);
        observer.complete();
      };
      reader.onerror = () => {
        observer.error('Failed to extract error message');
      };
      reader.readAsText(error);
    })
  }
}
