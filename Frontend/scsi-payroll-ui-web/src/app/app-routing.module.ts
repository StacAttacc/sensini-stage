import { CommonModule } from '@angular/common';
import { Injector, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
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
import { authguardGuard } from './services/authguard.guard';
import { AuthService } from './services/core/auth.service';
import { AuthGuard } from './services/guard-service.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    //data: { injector: Injector.create({ providers: [{ provide: AuthService, useClass: AuthService }] }) }
  },
  {
    path: 'taxes',
    component: TaxesComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    //canActivate: [authguardGuard],
    //data: { injector: Injector.create({ providers: [{ provide: AuthService, useClass: AuthService }] }) }
  },
  {
    path: 'taxes-employer',
    component: TaxesEmployerComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    //canActivate: [authguardGuard],
    //data: { injector: Injector.create({ providers: [{ provide: AuthService, useClass: AuthService }] }) }
  },
  {
    path: 'fiscal-years',
    component: FiscalYearsComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    //canActivate: [authguardGuard],
    //data: { injector: Injector.create({ providers: [{ provide: AuthService, useClass: AuthService }] }) }
  },
  {
    path: 'governments',
    component: GovernmentComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    //canActivate: [authguardGuard],
    //data: { injector: Injector.create({ providers: [{ provide: AuthService, useClass: AuthService }] }) }
  },
  {
    path: 'tax-brackets',
    component: TaxBracketsComponent,
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    //canActivate: [authguardGuard],
    //data: { injector: Injector.create({ providers: [{ provide: AuthService, useClass: AuthService }] }) }
  },
  {
    path: 'withheld-salary',
    component: WithheldSalaryComponent
  },
  {
    path: '**',
    component: NotFoundComponentComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
