import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFiscalYear, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-fiscal-years-delete',
  templateUrl: './fiscal-years-delete.component.html',
  styleUrls: ['./fiscal-years-delete.component.scss']
})
export class FiscalYearsDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: IFiscalYear,
              private formBuilder: FormBuilder,
              private fiscalYearsService: SocialContributionService){}

  formGroup = this.formBuilder.group({
    year: [0, Validators.required]
  });

  onDelete(){
    if(this.formGroup.valid){
      if(this.formGroup.value.year == this.data.year){
        this.fiscalYearsService.fiscalYearDeleteById(this.data.id).subscribe(fiscYear => {
          console.log('data deleted ', this.data.year);
        });
      };
    }
  }

}
