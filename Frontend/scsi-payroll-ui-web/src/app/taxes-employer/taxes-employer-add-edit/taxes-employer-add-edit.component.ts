import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { ISocialContributionEmployer, SocialContributionEmployer, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-taxes-employer-add-edit',
  templateUrl: './taxes-employer-add-edit.component.html',
  styleUrls: ['./taxes-employer-add-edit.component.scss']
})
export class TaxesEmployerAddEditComponent {
  title = "dynamicTitle";

  formGroup = this.formBuilder.group({
    id: [0],
    year: [0, Validators.required],
    rrqRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rrqMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    employmentInsurance: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    rqapRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rqapMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    cnesst: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    fss: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    fdrcmo: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: ISocialContributionEmployer,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService,
              private notificationService: NotificationServiceService){}

  ngOnInit():void{
    if(this.data != null){
      this.title = "Edit Data";
      this.socialContributionService.socialContributionEmployerById(this.data.id).subscribe(res => {
        this.formGroup.patchValue(this.data);
      });
    }
    else{
      this.title = "Add Data";
    }
  }

  onSubmit(){
    if (this.formGroup.valid){
      let tax = new SocialContributionEmployer;
      tax.id = this.formGroup.value.id?? 0;
      tax.fiscalYearId = this.formGroup.value.year?? 0;
      tax.rrqRate = parseFloat(this.formGroup.value.rrqRate?.toString()?? '');
      tax.rrqMga = parseFloat(this.formGroup.value.rqapMga?.toString()?? '');
      tax.employmentInsurance = parseFloat(this.formGroup.value.employmentInsurance?.toString()?? '');
      tax.rqapRate = parseFloat(this.formGroup.value.rqapRate?.toString()?? '');
      tax.rqapMga = parseFloat(this.formGroup.value.rrqMga?.toString()?? '');
      tax.cnesst = parseFloat(this.formGroup.value.cnesst?.toString()?? '');
      tax.fss = parseFloat(this.formGroup.value.fss?.toString()?? '');
      tax.fdrcmo = parseFloat(this.formGroup.value.fdrcmo?.toString()?? '');
      this.socialContributionService.socialContributionEmployer(tax).subscribe(res => {
        console.log(tax);
        this.notificationService.notify(NotificationTypes.REFRESH_TAXES_EMPLOYER);
        this.notificationService.openSnackBar("Tax Saved");
      });
    }
  }
}
