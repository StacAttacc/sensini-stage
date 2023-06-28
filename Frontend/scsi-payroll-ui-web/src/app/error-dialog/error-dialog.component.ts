import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationServiceService } from '../services/notification-service.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: string,
              private notificationService: NotificationServiceService){}

  errorMessage: string = '';
  ngOnInit():void{
    this.errorMessage = this.data;
  }
}
