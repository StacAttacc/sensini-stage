import { Component } from '@angular/core';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { Government, SocialContributionService } from '../services/payroll-api-proxy';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { MatDialog } from '@angular/material/dialog';
import { GovernmentAddEditComponent } from './government-add-edit/government-add-edit.component';
import { GovernmentDeleteComponent } from './government-delete/government-delete.component';

@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.scss']
})
export class GovernmentComponent {
  constructor(private governmentService: SocialContributionService, private dialog: MatDialog){}

  columnDefs =[
    { field: 'code' },
    { field: 'description' },
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
  ]

  rowData: Government[] = []

  onEditBtnClicked(e: any){
    this.openAddEditGovernment(e);
  }

  onDeleteBtnClicked(e: any){
    console.log(e.data);
    this.dialog.open(GovernmentDeleteComponent,{
      data: e.data,
      width: '500px',
    });
  }

  openAddGovernment(e: any){
    this.openAddEditGovernment(e);
  }

  openAddEditGovernment(e:any){
    if(e == null){
      this.dialog.open(GovernmentAddEditComponent,{
        width:'500px',
      });
    }
    else{
      console.log(e.data);
      this.dialog.open(GovernmentAddEditComponent,{
        data:e.data,
        width: '500px',
      });
    }
  }

  ngOnInit(){
    this.governmentService.governments().subscribe( gvt => {
      this.rowData = gvt;
    });
  }
}
