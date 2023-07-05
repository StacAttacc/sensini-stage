import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { ISocialContributionEmployer, SocialContributionEmployer, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-taxes-employer-delete',
  templateUrl: './taxes-employer-delete.component.html',
  styleUrls: ['./taxes-employer-delete.component.scss']
})
export class TaxesEmployerDeleteComponent {

  title = "dynamicTitle";

  formGroup = this.formBuilder.group({
    id: [0],
    year: [0],
    rrqRate: [0],
    rrqMga: [0],
    employmentInsurance: [0],
    rqapRate: [0],
    rqapMga: [0],
    cnesst: [0],
    fss: [0],
    fdrcmo: [0],
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: ISocialContributionEmployer,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService,
              private notificationService: NotificationServiceService){}

  delete(){
    this.socialContributionService.socialContributionEmployerDeleteById(this.data.id).subscribe(res => {
      console.log("delete tax");
      this.notificationService.notify(NotificationTypes.REFRESH_TAXES_EMPLOYER);
      this.notificationService.openSnackBar("Tax Deleted");
    });
  }

  ngOnInit():void{
    this.title = "Delete Data";
    this.socialContributionService.socialContributionEmployerById(this.data.id).subscribe(res => {
      this.formGroup.patchValue(res);
    });
  }
}
