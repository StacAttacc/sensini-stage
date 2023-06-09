import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { HomeComponent } from './home/home.component';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeesService, SocialContributionService } from './services/payroll-api-proxy';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeAddEditComponent } from './employees/employee-add-edit/employee-add-edit.component';
import { EmployeeDeleteComponent } from './employees/employee-delete/employee-delete.component';
import { EditBtnComponent } from './commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './commons/delete-btn/delete-btn.component';
import { TaxesComponent } from './taxes/taxes.component';
import { TaxAddEditComponent } from './taxes/tax-add-edit/tax-add-edit.component';
import { TaxDeleteComponent } from './taxes/tax-delete/tax-delete.component';
import { FiscalYearsComponent } from './fiscal-years/fiscal-years.component';
import { FiscalYearsAddEditComponent } from './fiscal-years/fiscal-years-add-edit/fiscal-years-add-edit.component';
import { FiscalYearsDeleteComponent } from './fiscal-years/fiscal-years-delete/fiscal-years-delete.component';
import { GovernmentComponent } from './government/government.component';
import { GovernmentAddEditComponent } from './government/government-add-edit/government-add-edit.component';
import { GovernmentDeleteComponent } from './government/government-delete/government-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    NotFoundComponentComponent,
    HomeComponent,
    EmployeeAddEditComponent,
    EmployeeDeleteComponent,
    EditBtnComponent,
    DeleteBtnComponent,
    TaxesComponent,
    TaxAddEditComponent,
    TaxDeleteComponent,
    FiscalYearsComponent,
    FiscalYearsAddEditComponent,
    FiscalYearsDeleteComponent,
    GovernmentComponent,
    GovernmentAddEditComponent,
    GovernmentDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridModule,//.withComponents([])
    HttpClientModule
  ],
  providers: [EmployeesService, SocialContributionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
