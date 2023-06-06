import { Component } from '@angular/core';
import { Employee, EmployeesService } from '../services/payroll-api-proxy';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { config } from 'rxjs';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';

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
    { field : 'nas' },
    { headerName: 'Edit',
      field: 'edit',
      cellRenderer:EditBtnComponent,
      cellRendererParams:{
        onClick: this.onEditBtnClicked.bind(this),
        label: 'Click',
      }
    },
    { headerName: 'Delete',
      field: 'delete',
      cellRenderer:DeleteBtnComponent,
      cellRendererParams:{
        onClick: this.onDeleteBtnClicked.bind(this),
        label: 'Click',
      }
    }
  ];

  rowData: Employee[] = [];
  constructor(private employeesService: EmployeesService,private dialog: MatDialog) {

  }

  onEditBtnClicked(e: any){
    this.openAddEmployeePage(e);
  }

  onDeleteBtnClicked(e: any){
    this.openDeleteEmployeePage(e);
  }

  openDeleteEmployeePage(e: any){
    console.log(e.data);
    this.dialog.open(EmployeeDeleteComponent,{
      data:e.data,
      width:'500px',
    });
  }


  openAddEmployeePage(e : any){
    if(e == null){
      this.dialog.open(EmployeeAddEditComponent,{
        width:'500px',
      });
    }
    else{
      console.log(e.data);
      this.dialog.open(EmployeeAddEditComponent,{
        data:e.data,
        width: '500px',
      });
    }
  }

  ngOnInit(): void{
    this.employeesService.employeesGet().subscribe(emps => {
      this.rowData = emps;
    });
  }
}
