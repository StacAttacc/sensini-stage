import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { Employee, EmployeesService, IEmployee } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent {

  formGroup = this.formBuilder.group({
    id: [0],
    firstName: [''],
    lastName: [''],
    birthDate: [new Date],
    nas:['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: IEmployee,
              private formBuilder: FormBuilder,
              private employeesService: EmployeesService,
              private notificationService: NotificationServiceService){}

  title = "dynamicTitle";

  delete(){
    this.employeesService.employeeDeleteById(this.data.id).subscribe( res => {
      console.log('deleted')
      this.notificationService.notify(NotificationTypes.REFRESH_EMPLOYEES);
      this.notificationService.openSnackBar("Employee Deleted");
    });
  }

  ngOnInit():void{
    this.title = "Delete Data";
    this.employeesService.employeeById(this.data.id).subscribe(res => {
      this.formGroup.patchValue(res);
    });
  }
}
