import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private notificationSubject = new BehaviorSubject<string>('');
  public notification$ = this.notificationSubject.asObservable();

  constructor(private snaccbar: MatSnackBar) { }

  public notify(message :string){
    this.notificationSubject.next(message);
  }

  public openSnackBar(message :string){
    this.snaccbar.open(message, "X", {duration: 2500});
  }
}
