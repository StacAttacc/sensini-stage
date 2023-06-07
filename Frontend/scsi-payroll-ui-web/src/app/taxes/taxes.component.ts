import { Component } from '@angular/core';
import { SocialContribution, SocialContributionService } from '../services/payroll-api-proxy';
import { MatDialog } from '@angular/material/dialog';
import { TaxAddEditComponent } from './tax-add-edit/tax-add-edit.component';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { TaxDeleteComponent } from './tax-delete/tax-delete.component';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent {

  columnDefs=[
    { field: 'year' },
    { field: 'rrqRate' },
    { field: 'rrqMga' },
    { field: 'employmentInsurance' },
    { field: 'rqapRate' },
    { field: 'rqapMga' },
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

  rowData: SocialContribution[] = [];

  constructor(private socialContributionService: SocialContributionService, private dialog: MatDialog){}

  openAddTaxPage(e: any){
    this.openTaxAddEdit(e);
  }

  onEditBtnClicked(e: any){
    this.openAddTaxPage(e);
  }

  openTaxAddEdit(e: any){
    console.log(e.data);
    if(e == null){
      this.dialog.open(TaxAddEditComponent,{
        width:'500px',
      });
    }
    else{
      
      this.dialog.open(TaxAddEditComponent,{
        data:e.data,
        width: '500px',
      });
    }
  }

  onDeleteBtnClicked(e: any){
    console.log(e.data);
    this.dialog.open(TaxDeleteComponent,{
      data:e.data,
      width:'500px',
    });
  }

  ngOnInit(): void{
    this.socialContributionService.socialContributions().subscribe(taxes => {
      this.rowData = taxes;
    });
  }

}
