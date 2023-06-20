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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: IEmployee,
              private formBuilder: FormBuilder,
              private employeesService: EmployeesService,
              private notificationService: NotificationServiceService){}

  delete(){
    if(this.formGroup.value){
      if(this.formGroup.value.firstName == this.data.firstName
        && this.formGroup.value.lastName == this.data.lastName)
      {
        this.employeesService.employeeDeleteById(this.data.id).subscribe( res => {
          console.log('deleted')
          this.notificationService.notify(NotificationTypes.REFRESH_EMPLOYEES);
        });
      }
    }
  }
}
