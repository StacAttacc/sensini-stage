import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { IFiscalYear, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-fiscal-years-delete',
  templateUrl: './fiscal-years-delete.component.html',
  styleUrls: ['./fiscal-years-delete.component.scss']
})
export class FiscalYearsDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: IFiscalYear,
              private formBuilder: FormBuilder,
              private fiscalYearsService: SocialContributionService,
              private mediatorService: NotificationServiceService){}

  formGroup = this.formBuilder.group({
    id: [0],
    year: [0],
    description: ['']
  });

  title = "dynamicTitle";

  onDelete(){
    this.fiscalYearsService.fiscalYearDeleteById(this.data.id).subscribe(fiscYear => {
      console.log('data deleted ', this.data.year);
      this.mediatorService.notify(NotificationTypes.REFRERSH_FISCAL_YEARS)
    });
  }

  ngOnInit():void{
    if(this.data != null){
      this.title = "Delete Data"
      this.fiscalYearsService.fiscalYearById(this.data.id).subscribe(res => {
        this.formGroup.patchValue(res);
      });
    }
  }

}
