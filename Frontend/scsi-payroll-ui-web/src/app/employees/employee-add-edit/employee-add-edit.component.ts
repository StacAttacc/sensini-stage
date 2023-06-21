import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationTypes } from 'src/app/models/constants';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { Employee, EmployeesService, IEmployee } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent {
  formGroup = this.formBuilder.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: [new Date, Validators.required],
    nas:['', Validators.required]
  });

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: IEmployee,
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private notificationService: NotificationServiceService){}


  onSubmit(){
    if(this.formGroup.valid){
      let employee =  new Employee();
      employee.id = this.formGroup.value.id?? 0;
      employee.firstName = this.formGroup.value.firstName?? '';
      employee.lastName = this.formGroup.value.lastName?? '';
      employee.birthDate = this.formGroup.value.birthDate?? new Date();
      employee.nas = this.formGroup.value.nas?? '';
      this.employeesService.employeesPost(employee).subscribe( res => {
        console.log('saved updates');
        this.notificationService.notify(NotificationTypes.REFRESH_EMPLOYEES);
      });
    }
  }

  title = "dynamicTitle";

  ngOnInit():void{
    if(this.data != null){
      this.title = "Edit Data"
      this.employeesService.employeeById(this.data.id).subscribe(emp => {
          this.formGroup.patchValue(emp);
      })
    }
    else{
      this.title = "Add Data";
    }
  }


}
