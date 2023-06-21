import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FiscalYear, Government, ITaxBracket, SocialContributionService } from 'src/app/services/payroll-api-proxy';

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
    id: [0],
    fiscalYearId: [0],
    governmentId: [0],
    lowerLimit: [0],
    upperLimit: [0],
    rate: [0]
  });

  fiscalYearOptions: FiscalYear[] = [];
  governmentOptions: Government[] = [];

  title = 'dynamic title';

  onDelete(){
    this.taxBracketService.taxBracketDeleteById(this.data.id).subscribe(taxBr => {
      console.log('data deleted');
      this.notificationService.notify(NotificationTypes.REFRESH_TAX_BRACKETS);
    });
  }

  ngOnInit(){
    this.taxBracketService.fiscalYears().subscribe(fiscYears => {
      this.fiscalYearOptions = fiscYears;
    });
    this.taxBracketService.governments().subscribe(gvts => {
      this.governmentOptions = gvts;
    });
    this.title = "Delete Data";
    this.taxBracketService.taxBracketById(this.data.id).subscribe(res => {
      this.formGroup.patchValue(res);
    });
  }
}
