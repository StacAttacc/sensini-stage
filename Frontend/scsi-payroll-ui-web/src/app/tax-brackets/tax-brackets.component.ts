import { Component } from '@angular/core';
import { FiscalYear, Government, SocialContributionService, TaxBracket } from '../services/payroll-api-proxy';
import { MatDialog } from '@angular/material/dialog';
import { TaxBracketsAddEditComponent } from './tax-brackets-add-edit/tax-brackets-add-edit.component';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { TaxBracketsDeleteComponent } from './tax-brackets-delete/tax-brackets-delete.component';
import { NotificationServiceService } from '../services/notification-service.service';
import { GridOptions } from 'ag-grid-community';

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
    { field: 'year' },
    { field: 'code' },
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

  rowData: any[] = [];

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
    let taxBrackets: TaxBracket[] = [];

    let fiscYears: FiscalYear[] = [];
    let fiscYearsMap: any[] = [];

    let governments: Government[] = [];
    let governmentsMap: any[] = [];
    this.taxBracketService.taxBrackets().subscribe(taxBr => {
      taxBrackets = taxBr;
    });

    this.taxBracketService.fiscalYears().subscribe(yrs => {
      console.log(yrs);
      for (const element of yrs){
        if(element.id != undefined){
          fiscYearsMap[element.id] = element.year;
        }
        else{
          console.log("element undefined")
        }
      }
    });
    this.taxBracketService.governments().subscribe(gvts => {
      for (const element of gvts){
        if(element.id != undefined){
          governmentsMap[element.id] = element.code;
        }
        else{
          console.log("gvt undefined")
        }
      }
    });

    this.taxBracketService.taxBrackets().subscribe(res => {
      this.rowData = res.map(tax => {
        if(tax.fiscalYearId != undefined && tax.governmentId != undefined){({
          year: fiscYearsMap[tax.fiscalYearId],
          code: governmentsMap[tax.governmentId],
          lowerLimit: tax.lowerLimit,
          upperLimit: tax.upperLimit,
          rate: tax.rate
      })}})
    });


  }
}
