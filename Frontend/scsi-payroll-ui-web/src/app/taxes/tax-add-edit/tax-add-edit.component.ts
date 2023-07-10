import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FiscalYear, ISocialContributionEmployee, SocialContributionEmployee, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-tax-add-edit',
  templateUrl: './tax-add-edit.component.html',
  styleUrls: ['./tax-add-edit.component.scss']
})
export class TaxAddEditComponent {
  formGroup = this.formBuilder.group({
    id: [0],
    fiscalYearId: [0, Validators.required],
    rrqRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rrqMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    employmentInsurance: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    rqapRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rqapMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISocialContributionEmployee,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService,
              private notificationService: NotificationServiceService){}

  title = "dynamicTitle";

  fiscalYearOptions: FiscalYear[] = [];

  onSubmit(){
    if(this.formGroup.valid){
      let tax = new SocialContributionEmployee;
      tax.id = this.formGroup.value.id?? 0;
      tax.fiscalYearId = this.formGroup.value.fiscalYearId?? 0;
      tax.rrqRate = parseFloat(this.formGroup.value.rqapRate?.toString()?? '');
      tax.rrqMga = parseFloat(this.formGroup.value.rqapMga?.toString()?? '');
      tax.employmentInsurance = parseFloat(this.formGroup.value.employmentInsurance?.toString()?? '');
      tax.rqapRate = parseFloat(this.formGroup.value.rqapRate?.toString()?? '');
      tax.rqapMga = parseFloat(this.formGroup.value.rqapMga?.toString()?? '');
      //this.socialContributionService.fiscalYearById(tax.fiscalYearId).subscribe(res => {
      //  tax.fiscalYear = res;
        this.socialContributionService.socialContributionEmployee(tax).subscribe( tax => {
          console.log(tax);
          this.notificationService.notify(NotificationTypes.REFRESH_TAXES);
          this.notificationService.openSnackBar("Tax Saved");
        });
      //});
    }
  }

  ngOnInit(){
    this.socialContributionService.fiscalYears().subscribe(res => {
      this.fiscalYearOptions = res;
    });
    if(this.data != null){
      this.title = "Edit Data";
      this.socialContributionService.socialContributionEmployeeById(this.data.id).subscribe( tax => {
        this.formGroup.patchValue(tax);
      });
    }
    else{
      this.title = "Add Data";
    }
  }

}
