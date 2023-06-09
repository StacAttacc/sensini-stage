import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISocialContribution, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-tax-delete',
  templateUrl: './tax-delete.component.html',
  styleUrls: ['./tax-delete.component.scss']
})
export class TaxDeleteComponent {
  formGroup = this.formBuilder.group({
    year: [0, Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISocialContribution,
              private formBuilder: FormBuilder,
              private socialContributionService: SocialContributionService
            ){}

  delete(){
    if(this.formGroup.valid){
      if(this.data.year == this.formGroup.value.year){
        this.socialContributionService.socialContributionDeleteById(this.data.id).subscribe( tax => {
          console.log('tax deleted');
        });
      }
    }
  }
}
