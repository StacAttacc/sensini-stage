import { Component } from '@angular/core';
import { Employee, EmployeesService } from '../services/payroll-api-proxy';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {


  columnDefs = [
    { field : 'id' },
    { field : 'firstName' },
    { field: 'lastName' },
    { field : 'birthDate' },
    { field : 'nas' }
  ];

  rowData: Employee[] = [];
  constructor(private employeesService: EmployeesService,private addEmployee: MatDialog) {

  }

  openAddEmployeePage(){
    this.addEmployee.open(EmployeeAddEditComponent,{
      width:'500px',
    });
  }

  ngOnInit(): void{
    this.employeesService.employeesGet().subscribe(emps => {
      this.rowData = emps;
    });
  }
}
