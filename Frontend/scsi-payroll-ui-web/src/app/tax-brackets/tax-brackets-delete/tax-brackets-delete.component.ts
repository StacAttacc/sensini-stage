import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { ITaxBracket, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-tax-brackets-delete',
  templateUrl: './tax-brackets-delete.component.html',
  styleUrls: ['./tax-brackets-delete.component.scss']
})
export class TaxBracketsDeleteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: ITaxBracket,
              private taxBracketService: SocialContributionService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationServiceService){}

  formGroup = this.formBuilder.group({
    fiscalYearId: [0, Validators.required],
    governmentId: [0, Validators.required]
  });

  onDelete(){
    if(this.formGroup.valid){
      if(this.formGroup.value.fiscalYearId == this.data.fiscalYearId &&
        this.formGroup.value.governmentId == this.data.governmentId){
          this.taxBracketService.taxBracketDeleteById(this.data.id).subscribe(taxBr => {
            console.log('data deleted');
            this.notificationService.notify(NotificationTypes.REFRESH_TAX_BRACKETS);
          });
        }
    }
  }
}
