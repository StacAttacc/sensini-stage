import { Component, OnDestroy } from '@angular/core';
import { FiscalYear, Government, SocialContributionService, TaxBracket } from '../services/payroll-api-proxy';
import { MatDialog } from '@angular/material/dialog';
import { TaxBracketsAddEditComponent } from './tax-brackets-add-edit/tax-brackets-add-edit.component';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { TaxBracketsDeleteComponent } from './tax-brackets-delete/tax-brackets-delete.component';
import { NotificationServiceService } from '../services/notification-service.service';
import { GridOptions } from 'ag-grid-community';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tax-brackets',
  templateUrl: './tax-brackets.component.html',
  styleUrls: ['./tax-brackets.component.scss']
})
export class TaxBracketsComponent implements OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private taxBracketService: SocialContributionService,
              private dialog:MatDialog,
              private notificationServie: NotificationServiceService){
                this.notificationServie.notification$
                .pipe(takeUntil(this.destroy$))
                .subscribe(res => {
                  this.loadTaxBrackets();
                });
              }


  getTaxYear(id: any){
    let fiscYear: number|undefined;
    this.taxBracketService.fiscalYearById(id).subscribe(res => {
      fiscYear = res.year
    });
    return fiscYear;
  }

  getGvtCode(id: any){
    let gvtCode: string|undefined;
    this.taxBracketService.governmentById(id).subscribe(res => {
      gvtCode = res.code
    });
    return gvtCode;
  }

  columnDefs = [
    { headerName: 'Fiscal Year', field: 'fiscalYear.year' },
    { headerName: 'Government', field: 'government.code' },
    { headerName: 'Lower Limit', field: 'lowerLimit' },
    { headerName: 'Upper Limit', field: 'upperLimit' },
    { headerName: 'Rate', field: 'rate' },
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
        width:'500px'
      });
    }
    else{
      this.dialog.open(TaxBracketsAddEditComponent,{
        data: e.data,
        width: '500px',
      });
    }
  }

  ngOnInit(){
    this.loadTaxBrackets();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadTaxBrackets(){
    this.taxBracketService.taxBrackets().subscribe(res => {
      this.rowData = res;
    });
  }
}
