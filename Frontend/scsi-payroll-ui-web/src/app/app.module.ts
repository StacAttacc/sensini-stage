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
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { HomeComponent } from './home/home.component';
import { AgGridModule } from 'ag-grid-angular';
import { API_BASE_URL, EmployeesService, SocialContributionService } from './services/payroll-api-proxy';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TaxBracketsComponent } from './tax-brackets/tax-brackets.component';
import { TaxBracketsAddEditComponent } from './tax-brackets/tax-brackets-add-edit/tax-brackets-add-edit.component';
import { TaxBracketsDeleteComponent } from './tax-brackets/tax-brackets-delete/tax-brackets-delete.component';
import { NotificationServiceService } from './services/notification-service.service';
import { CustomDateAdapter } from './employees/employee-add-edit/custom-date-adapter';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HttpRequestInterceptorService } from './services/http-request-interceptor.service';
import { TaxesEmployerComponent } from './taxes-employer/taxes-employer.component';
import { TaxesEmployerAddEditComponent } from './taxes-employer/taxes-employer-add-edit/taxes-employer-add-edit.component';
import { TaxesEmployerDeleteComponent } from './taxes-employer/taxes-employer-delete/taxes-employer-delete.component';
import { WithheldSalaryComponent } from './withheld-salary/withheld-salary.component';
import { LoginComponent } from './users/login/login.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

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
    GovernmentDeleteComponent,
    TaxBracketsComponent,
    TaxBracketsAddEditComponent,
    TaxBracketsDeleteComponent,
    ErrorDialogComponent,
    TaxesEmployerComponent,
    TaxesEmployerAddEditComponent,
    TaxesEmployerDeleteComponent,
    WithheldSalaryComponent,
    LoginComponent
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
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AgGridModule,//.withComponents([])
    HttpClientModule
  ],
  providers: [
    EmployeesService,
    SocialContributionService,
    NotificationServiceService,
    {
      provide: DateAdapter, useClass:CustomDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },
    {
      provide: API_BASE_URL,
      useValue: 'https://localhost:5001'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
