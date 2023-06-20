import { Component } from '@angular/core';
import { SocialContributionService, TaxBracket } from '../services/payroll-api-proxy';
import { MatDialog } from '@angular/material/dialog';
import { TaxBracketsAddEditComponent } from './tax-brackets-add-edit/tax-brackets-add-edit.component';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { TaxBracketsDeleteComponent } from './tax-brackets-delete/tax-brackets-delete.component';
import { NotificationServiceService } from '../services/notification-service.service';

@Component({
  selector: 'app-tax-brackets',
  templateUrl: './tax-brackets.component.html',
  styleUrls: ['./tax-brackets.component.scss']
})
export class TaxBracketsComponent {
  constructor(private taxBracketService: SocialContributionService,
              private dialog:MatDialog,
              private notificationServie: NotificationServiceService){
                this.notificationServie.notification$.subscribe(res => {
                  this.loadTaxBrackets();
                });
              }

  columnDefs = [
    { field: 'fiscalYearId' },
    { field: 'governmentId' },
    { field: 'lowerLimit' },
    { field: 'upperLimit' },
    { field: 'rate' },
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

  rowData: TaxBracket[] = [];

  openAddTaxBracket(e: any){
    this.openAddEditTaxBracket(e);
  }

  onEditBtnClicked(e: any){
    this.openAddEditTaxBracket(e);
  }

  onDeleteBtnClicked(e: any){
    console.log(e.data);
    this.dialog.open(TaxBracketsDeleteComponent,{
      data:e.data,
      width:'500px',
    });
  }

  openAddEditTaxBracket(e: any){
    if(e == null){
      this.dialog.open(TaxBracketsAddEditComponent,{
        width:'500px',
      });
    }
    else{
      this.dialog.open(TaxBracketsAddEditComponent,{
        data:e.data,
        width: '500px',
      });
    }
  }

  ngOnInit(){
    this.loadTaxBrackets();
  }

  loadTaxBrackets(){
    this.taxBracketService.taxBrackets().subscribe(taxBr => {
      this.rowData = taxBr;
    });
  }
}
