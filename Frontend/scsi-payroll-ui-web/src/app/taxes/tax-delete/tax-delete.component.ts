import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { ISocialContribution, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-tax-delete',
  templateUrl: './tax-delete.component.html',
  styleUrls: ['./tax-delete.component.scss']
})
export class TaxDeleteComponent {
  formGroup = this.formBuilder.group({
    id: [0],
    year: [0],
    rrqRate: [0],
    rrqMga: [0],
    employmentInsurance: [0],
    rqapRate: [0],
    rqapMga: [0]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISocialContribution,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService,
              private notificationService: NotificationServiceService){}

  title = "dynamicTitle";

  delete(){
    this.socialContributionService.socialContributionDeleteById(this.data.id).subscribe( tax => {
      console.log('tax deleted');
      this.notificationService.notify(NotificationTypes.REFRESH_TAXES);
      this.notificationService.openSnackBar("Tax Deleted");
    });
  }

  ngOnInit():void{
    this.title = "Delete Data"
    this.socialContributionService.socialContributionById(this.data.id).subscribe(res => {
      this.formGroup.patchValue(res);
    });
  }
}
