import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private notificationSubject = new BehaviorSubject<string>('');
  public notification$ = this.notificationSubject.asObservable();

  constructor() { }

  public notify(message :string){
    this.notificationSubject.next(message);
  }
}
