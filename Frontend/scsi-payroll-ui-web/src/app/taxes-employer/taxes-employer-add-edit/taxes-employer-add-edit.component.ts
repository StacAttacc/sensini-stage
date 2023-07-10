import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FiscalYear, ISocialContributionEmployer, SocialContributionEmployer, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-taxes-employer-add-edit',
  templateUrl: './taxes-employer-add-edit.component.html',
  styleUrls: ['./taxes-employer-add-edit.component.scss']
})
export class TaxesEmployerAddEditComponent {
  title = "dynamicTitle";

  formGroup = this.formBuilder.group({
    id: [0],
    fiscalYearId: [0, Validators.required],
    rrqRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rrqMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    employmentInsurance: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    rqapRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rqapMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    cnesst: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    fss: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    fdrcmo: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
  });

  fiscalYearOptions: FiscalYear[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: ISocialContributionEmployer,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService,
              private notificationService: NotificationServiceService){}

  ngOnInit():void{
    this.socialContributionService.fiscalYears().subscribe(res =>{
      this.fiscalYearOptions = res;
    });
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
      console.log(this.formGroup.value);
      let tax = new SocialContributionEmployer();
      tax.id = this.formGroup.value.id?? 0;
      tax.fiscalYearId = this.formGroup.value.fiscalYearId?? 0;
      tax.rrqRate = this.formGroup.value.rrqRate?? 0;
      tax.rrqMga = this.formGroup.value.rqapMga?? 0;
      tax.employmentInsurance = this.formGroup.value.employmentInsurance?? 0;
      tax.rqapRate = this.formGroup.value.rqapRate?? 0;
      tax.rqapMga = this.formGroup.value.rrqMga?? 0;
      tax.cnesst = this.formGroup.value.cnesst?? 0;
      tax.fss = this.formGroup.value.fss?? 0;
      tax.fdrcmo = this.formGroup.value.fdrcmo?? 0;
      this.socialContributionService.fiscalYearById(tax.fiscalYearId).subscribe(res => {
        tax.fiscalYear = res;
        this.socialContributionService.socialContributionEmployer(tax).subscribe(res => {
          console.log(tax);
          this.notificationService.notify(NotificationTypes.REFRESH_TAXES_EMPLOYER);
          this.notificationService.openSnackBar("Tax Saved");
        });
      });
    }
  }
}
