import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FiscalYear, SocialContributionService, TaxCalculationsParameters, WithheldSalary } from '../services/payroll-api-proxy';

@Component({
  selector: 'app-withheld-salary',
  templateUrl: './withheld-salary.component.html',
  styleUrls: ['./withheld-salary.component.scss']
})
export class WithheldSalaryComponent {
  formGroup = this.formBuilder.group({
    amount : [0, Validators.required],
    fiscalYearId : [0, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private taxCalculationService: SocialContributionService){}

  withhelpSalary:WithheldSalary = new WithheldSalary();
  amountToPay:number = 0;

  fiscalYearOptions: FiscalYear[] = [];

  formOutput = this.formBuilder.group({
    rrq: [0],
    rqap: [0],
    fedTax: [0],
    provTax: [0],
    employmentInsurance: [0],
    totalAmountToPay: [0]
  });

  onSubmit(){
    let tax = new TaxCalculationsParameters();
    tax.amount = this.formGroup.value.amount?? 0;
    tax.fiscalYearId = this.formGroup.value.fiscalYearId?? 0;
    this.taxCalculationService.socialContribubtionEmployeeCalculateTax(tax).subscribe(e => {
      this.withhelpSalary = e;
      this.amountToPay = this.calculateAmountToPay(e.fedTax?? 0,
                                                    e.provTax?? 0,
                                                    e.rrq?? 0,
                                                    e.rqap?? 0,
                                                    e.employmentInsurance?? 0);
      this.formOutput.patchValue(e);
      this.formOutput.patchValue({
        totalAmountToPay: this.amountToPay
      });
    });

  }

  calculateAmountToPay(fed:number,prov:number, rrq:number, rqap:number, ins:number): number{
    let taxes = fed+prov+rrq+rqap+ins;
    return taxes;
  }

  ngOnInit(){
    this.taxCalculationService.fiscalYears().subscribe(e => {
      this.fiscalYearOptions = e;
    });
  }
}
