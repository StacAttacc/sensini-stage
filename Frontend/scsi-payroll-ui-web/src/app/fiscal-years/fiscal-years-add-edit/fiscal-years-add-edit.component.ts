import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FiscalYear, IFiscalYear, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-fiscal-years-add-edit',
  templateUrl: './fiscal-years-add-edit.component.html',
  styleUrls: ['./fiscal-years-add-edit.component.scss']
})
export class FiscalYearsAddEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: IFiscalYear,
              private formBuilder: FormBuilder,
              private fiscalYearService: SocialContributionService){}

  formGroup = this.formBuilder.group({
    id: [0],
    year: [0, Validators.required],
    description: ['', Validators.required]
  });

  onSubmit(){
    let fiscalYear = new FiscalYear();
    fiscalYear.id = this.formGroup.value.id?? 0;
    fiscalYear.year = this.formGroup.value.year?? 0;
    fiscalYear.description = this.formGroup.value.description?? '';
    this.fiscalYearService.fiscalYear(fiscalYear).subscribe( fiscYear => {
      console.log('fiscal year saved');
    });
  }

  ngOnInit(){
    if(this.data != null){
      this.fiscalYearService.fiscalYearById(this.data.id).subscribe(fiscYear =>{
        this.formGroup.patchValue(fiscYear);
      });
    }
  }
}
