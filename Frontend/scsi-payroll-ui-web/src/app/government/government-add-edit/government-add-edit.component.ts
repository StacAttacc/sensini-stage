import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Government, IGovernment, SocialContributionService } from 'src/app/services/payroll-api-proxy';

@Component({
  selector: 'app-government-add-edit',
  templateUrl: './government-add-edit.component.html',
  styleUrls: ['./government-add-edit.component.scss']
})
export class GovernmentAddEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: IGovernment,
              private formBuilder: FormBuilder,
              private governmentService: SocialContributionService){}

  formGroup = this.formBuilder.group({
    id: [0],
    code: ['', [Validators.required, Validators.pattern('^[A-Z]{1,3}$')]],
    description: ['', Validators.required]
  });

  onSubmit(){
    if(this.formGroup.valid){
      let government = new Government;
      government.id = this.formGroup.value.id?? 0;
      government.code = this.formGroup.value.code?? '';
      government.description = this.formGroup.value.description?? '';
      this.governmentService.government(government).subscribe( gvt => {
        console.log('data saved');
      });
    }
  }

  ngOnInit(){
    if(this.data != null){
      this.governmentService.governmentById(this.data.id).subscribe(gvt => {
        this.formGroup.patchValue(gvt);
      });
    }
  }
}
