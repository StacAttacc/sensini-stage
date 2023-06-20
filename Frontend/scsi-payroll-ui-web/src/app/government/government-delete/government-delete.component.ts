import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { IGovernment, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-government-delete',
  templateUrl: './government-delete.component.html',
  styleUrls: ['./government-delete.component.scss']
})
export class GovernmentDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: IGovernment,
              private governmentService: SocialContributionService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationServiceService){}
  formGroup = this.formBuilder.group({
    code: ['', Validators.required]
  });

  onDelete(){
    if(this.formGroup.valid){
      if(this.formGroup.value.code == this.data.code){
        this.governmentService.governmentDeleteById(this.data.id).subscribe(gvt =>{
          console.log('data deleted');
          this.notificationService.notify(NotificationTypes.REFRESH_GOVERNMENT);
        });
      }
    }
  }
}
