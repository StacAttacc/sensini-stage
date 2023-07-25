import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { HomeComponent } from './home/home.component';
import { TaxesComponent } from './taxes/taxes.component';
import { FiscalYearsComponent } from './fiscal-years/fiscal-years.component';
import { GovernmentComponent } from './government/government.component';
import { TaxBracketsComponent } from './tax-brackets/tax-brackets.component';
import { TaxesEmployerComponent } from './taxes-employer/taxes-employer.component';
import { WithheldSalaryComponent } from './withheld-salary/withheld-salary.component';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component: LoginComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'taxes', component: TaxesComponent},
  {path: 'taxes-employer', component: TaxesEmployerComponent},
  {path: 'fiscal-years', component: FiscalYearsComponent},
  {path: 'governments', component: GovernmentComponent},
  {path: 'tax-brackets', component: TaxBracketsComponent},
  {path: 'withheld-salary', component: WithheldSalaryComponent},
  {path: '**', component: NotFoundComponentComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
