import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FiscalYear, Government, ITaxBracket, SocialContributionService, TaxBracket } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-tax-brackets-add-edit',
  templateUrl: './tax-brackets-add-edit.component.html',
  styleUrls: ['./tax-brackets-add-edit.component.scss']
})
export class TaxBracketsAddEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ITaxBracket,
              private formBuilder: FormBuilder,
              private taxBracketService: SocialContributionService,
              private notificationService: NotificationServiceService){}

  fiscalYearOptions: FiscalYear[] = [];
  governmentOptions: Government[] = [];

  title = "dynamicTitle";

  formGroup = this.formBuilder.group({
    id: [0],
    fiscalYearId: [0, Validators.required],
    governmentId: [0, Validators.required],
    lowerLimit: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    upperLimit: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    rate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]]
  });

  onSubmit(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      let taxBracket = new TaxBracket;
      taxBracket.id = this.formGroup.value.id?? 0;
      taxBracket.fiscalYearId = this.formGroup.value.fiscalYearId?? 0;
      taxBracket.governmentId = this.formGroup.value.governmentId?? 0;
      taxBracket.lowerLimit = this.formGroup.value.lowerLimit?? 0;
      taxBracket.upperLimit = this.formGroup.value.upperLimit?? 0;
      taxBracket.rate = this.formGroup.value.rate?? 0;
      this.taxBracketService.taxBracket(taxBracket).subscribe(taxBr => {
        console.log('data saved');
        this.notificationService.notify(NotificationTypes.REFRESH_TAX_BRACKETS);
      });
    }
  }

  ngOnInit(){
    this.taxBracketService.fiscalYears().subscribe(fiscYears => {
      this.fiscalYearOptions = fiscYears;
    });
    this.taxBracketService.governments().subscribe(gvts => {
      this.governmentOptions = gvts;
    });
    if(this.data != null){
      console.log(this.data)
      this.title = "Edit Data";
      this.taxBracketService.taxBracketById(this.data.id).subscribe(taxBr => {
        this.formGroup.patchValue(taxBr);
      });
    }
    else{
      this.title = "Add Data";
    }
  }
}
