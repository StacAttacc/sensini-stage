import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISocialContribution, SocialContribution, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-tax-add-edit',
  templateUrl: './tax-add-edit.component.html',
  styleUrls: ['./tax-add-edit.component.scss']
})
export class TaxAddEditComponent {
  formGroup = this.formBuilder.group({
    id: [0],
    year: [0, Validators.required],
    rrqRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rrqMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    employmentInsurance: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]],
    rqapRate: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d+)$')]],
    rqapMga: [0, [Validators.required, Validators.pattern('^\\d+(\\.\\d{2})$')]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISocialContribution,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService){}

  onSubmit(){
    if(this.formGroup.valid){
      let tax = new SocialContribution;
      tax.id = this.formGroup.value.id?? 0;
      tax.year = this.formGroup.value.year?? 0;
      tax.rrqRate = parseFloat(this.formGroup.value.rqapRate?.toString()?? '');
      tax.rrqMga = parseFloat(this.formGroup.value.rqapMga?.toString()?? '');
      tax.employmentInsurance = parseFloat(this.formGroup.value.employmentInsurance?.toString()?? '');
      tax.rqapRate = parseFloat(this.formGroup.value.rqapRate?.toString()?? '');
      tax.rqapMga = parseFloat(this.formGroup.value.rqapMga?.toString()?? '');
      this.socialContributionService.socialContribution(tax).subscribe( tax => {
        console.log(tax);
      });
    }
  }

  ngOnInit(){
    if(this.data != null){
      this.socialContributionService.socialContributionById(this.data.id).subscribe( tax => {
        this.formGroup.patchValue(tax);
      });
    }
  }
}
