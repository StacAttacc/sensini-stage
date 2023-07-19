import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployerTaxes, FiscalYear, SocialContributionService, TaxCalculationsParameters, WithheldSalary } from '../services/payroll-api-proxy';

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

  withhelpSalary: WithheldSalary = new WithheldSalary();
  amountToPayEmployee: number = 0;

  employerTaxes: EmployerTaxes = new EmployerTaxes();
  amountToPayEmployer: number = 0;

  fiscalYearOptions: FiscalYear[] = [];

  formOutputEmployee = this.formBuilder.group({
    rrq: [0],
    rqap: [0],
    fedTax: [0],
    provTax: [0],
    employmentInsurance: [0],
    totalAmountToPay: [0]
  });
  formOutputEmployer = this.formBuilder.group({
    rrq: [0],
    rqap: [0],
    employmentInsurance: [0],
    cnesst: [0],
    fss: [0],
    fdrcmo: [0],
    totalAmountToPay: [0]
  });

  onSubmit(){
    let tax = new TaxCalculationsParameters();
    tax.amount = this.formGroup.value.amount?? 0;
    tax.fiscalYearId = this.formGroup.value.fiscalYearId?? 0;
    this.taxCalculationService.socialContribubtionEmployeeCalculateTax(tax).subscribe(e => {
      this.withhelpSalary = e;
      this.amountToPayEmployee = this.calculateAmountToPayEmployee(e.fedTax?? 0,
                                                            e.provTax?? 0,
                                                            e.rrq?? 0,
                                                            e.rqap?? 0,
                                                            e.employmentInsurance?? 0);
      this.formOutputEmployee.patchValue(e);
      this.formOutputEmployee.patchValue({
        totalAmountToPay: this.amountToPayEmployee
      });
    });
    this.taxCalculationService.socialContributionEmployerCalculateTax(tax).subscribe(p => {
      this.employerTaxes = p;
      console.log(p);
      this.amountToPayEmployer = this.calculateAmountToPayEmployer(p.rrq?? 0,
                                                                    p.rqap?? 0,
                                                                    p.employmentInsurance?? 0,
                                                                    p.cnesst?? 0,
                                                                    p.fss?? 0,
                                                                    p.fdrcmo?? 0);
      this.formOutputEmployer.patchValue(p);
      this.formOutputEmployer.patchValue({
        totalAmountToPay: this.amountToPayEmployer
      });
    });
  }

  calculateAmountToPayEmployee(fed:number,prov:number, rrq:number, rqap:number, ins:number): number{
    let taxes = fed+prov+rrq+rqap+ins;
    return taxes;
  }

  calculateAmountToPayEmployer(rrq:number, rqap:number, ins:number, cnesst:number, fss:number, fdrcmo:number){
    let taxes = rrq+rqap+ins+cnesst+fss+fdrcmo;
    return taxes;
  }

  ngOnInit(){
    this.taxCalculationService.fiscalYears().subscribe(e => {
      this.fiscalYearOptions = e;
    });
  }
}
