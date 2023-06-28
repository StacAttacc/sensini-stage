import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private notificationSubject = new BehaviorSubject<string>('');
  public notification$ = this.notificationSubject.asObservable();

  private errorDialogSubject = new BehaviorSubject<string>('');
  public errorDialog$ = this.errorDialogSubject.asObservable();

  constructor(private snaccbar: MatSnackBar,
              private dialog: MatDialog) { }

  public notify(message :string){
    this.notificationSubject.next(message);
  }

  public openSnackBar(message :string){
    this.snaccbar.open(message, "X", {duration: 2500});
  }

  public showError(message :string){
    this.dialog.open(ErrorDialogComponent, {
      data: message,
      width: '500px'
    });
  }
}
