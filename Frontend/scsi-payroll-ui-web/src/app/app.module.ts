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
import { EmployeesService } from './services/payroll-api-proxy';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeAddEditComponent } from './employees/employee-add-edit/employee-add-edit.component';
import { EmployeeDeleteComponent } from './employees/employee-delete/employee-delete.component';
import { EditBtnComponent } from './commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './commons/delete-btn/delete-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    NotFoundComponentComponent,
    HomeComponent,
    EmployeeAddEditComponent,
    EmployeeDeleteComponent,
    EditBtnComponent,
    DeleteBtnComponent
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
  providers: [EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
