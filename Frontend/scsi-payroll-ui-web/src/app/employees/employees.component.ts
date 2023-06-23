import { Component } from '@angular/core';
import { Employee, EmployeesService } from '../services/payroll-api-proxy';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { config } from 'rxjs';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { NotificationServiceService } from '../services/notification-service.service';
import { NotificationTypes } from '../models/constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [DatePipe]
})
export class EmployeesComponent {

  columnDefs = [
    { field : 'firstName' },
    { field: 'lastName' },
    {
      headerName: 'Birth Date',
      field : 'birthDate',
      cellRenderer: (theDate:any) => {
        return this.datePipe.transform(theDate.value, 'yyyy-MM-dd');
      }
    },
    {
      headerName: 'NAS',
      field : 'nas',
      cellRenderer: (theNumber: any) => {
        let originalString = theNumber.value;
        let formattedString = '';
        for (let i = 0; i < originalString.length; i++){
          if (i > 0 && i % 3 === 0){
            formattedString += '-';
          }
          formattedString += originalString[i];
        }
        return formattedString;
      }
    },
    {
      headerName: 'Edit',
      field: 'edit',
      cellRenderer:EditBtnComponent,
      cellRendererParams:{
        onClick: this.onEditBtnClicked.bind(this),
        label: 'Click',
      }
    },
    {
      headerName: 'Delete',
      field: 'delete',
      cellRenderer:DeleteBtnComponent,
      cellRendererParams:{
        onClick: this.onDeleteBtnClicked.bind(this),
        label: 'Click',
      }
    }
  ];

  rowData: Employee[] = [];
  constructor(private employeesService: EmployeesService,
              private dialog: MatDialog,
              private notificationService: NotificationServiceService,
              private datePipe: DatePipe){
                this.notificationService.notification$.subscribe(res => {
                  if(res == NotificationTypes.REFRESH_EMPLOYEES){
                    this.loadEmmployees();
                  }
                });
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
    this.loadEmmployees();
  }

  loadEmmployees(){
    this.employeesService.employeesGet().subscribe(emps => {
      this.rowData = emps;
    });
  }
}
