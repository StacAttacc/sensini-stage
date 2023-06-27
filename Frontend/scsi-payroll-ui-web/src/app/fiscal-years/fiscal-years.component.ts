import { Component, OnDestroy } from '@angular/core';
import { FiscalYear, SocialContributionService } from '../services/payroll-api-proxy';
import { MatDialog } from '@angular/material/dialog';
import { FiscalYearsAddEditComponent } from './fiscal-years-add-edit/fiscal-years-add-edit.component';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { FiscalYearsDeleteComponent } from './fiscal-years-delete/fiscal-years-delete.component';
import { NotificationServiceService } from '../services/notification-service.service';
import { NotificationTypes } from '../models/constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fiscal-years',
  templateUrl: './fiscal-years.component.html',
  styleUrls: ['./fiscal-years.component.scss']
})
export class FiscalYearsComponent implements OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  columnDefs = [
    { field: 'id' },
    { field: 'year'},
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
  ];

  rowData: FiscalYear[] = [];
  constructor(private fiscalYearService: SocialContributionService,
              private dialog: MatDialog,
              private notificationService: NotificationServiceService){
                this.notificationService.notification$
                .pipe(takeUntil(this.destroy$))
                .subscribe(e => {
                  if(e == NotificationTypes.REFRERSH_FISCAL_YEARS){
                    this.loadFiscalYears();
                  }
                })
              }

  openAddFiscalYear(e: any){
    this.openAddEditFiscalYear(e);
  }

  onEditBtnClicked(e: any){
    this.openAddEditFiscalYear(e);
  }

  onDeleteBtnClicked(e: any){
    this.openDeleteFiscalYear(e);
  }

  openDeleteFiscalYear(e: any){
    console.log(e.data);
    this.dialog.open(FiscalYearsDeleteComponent,{
      data: e.data,
      width: '500px',
    });
  }

  openAddEditFiscalYear(e: any){
    if(e == null){
      this.dialog.open(FiscalYearsAddEditComponent,{
        width:'500px',
      });
    }
    else{
      console.log(e.data);
      this.dialog.open(FiscalYearsAddEditComponent,{
        data:e.data,
        width: '500px',
      });
    }
  }

  ngOnInit(){
    this.loadFiscalYears();
  }

  ngOnDestroy():void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadFiscalYears(){
    this.fiscalYearService.fiscalYears().subscribe( fiscYear => {
      this.rowData = fiscYear;
    })
  }
}
