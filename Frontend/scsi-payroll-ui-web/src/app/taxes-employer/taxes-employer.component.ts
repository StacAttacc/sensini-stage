import { Component } from '@angular/core';
import { SocialContributionEmployer, SocialContributionService } from '../services/payroll-api-proxy';
import { MatDialog } from '@angular/material/dialog';
import { NotificationServiceService } from '../services/notification-service.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationTypes } from '../models/constants';
import { EditBtnComponent } from '../commons/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from '../commons/delete-btn/delete-btn.component';
import { TaxesEmployerDeleteComponent } from './taxes-employer-delete/taxes-employer-delete.component';
import { TaxesEmployerAddEditComponent } from './taxes-employer-add-edit/taxes-employer-add-edit.component';

@Component({
  selector: 'app-taxes-employer',
  templateUrl: './taxes-employer.component.html',
  styleUrls: ['./taxes-employer.component.scss']
})
export class TaxesEmployerComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();

  columnDefs = [
    {
      headerName: 'Fiscal Year',
      field: 'fiscalYearId'
    },
    { field: 'rrqRate' },
    { field: 'rrqMga' },
    { field: 'employmentInsurance' },
    { field: 'rqapRate' },
    { field: 'rqapMga' },
    { field: 'cnesst' },
    { field: 'fss' },
    { field: 'fdrcmo' },
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

  rowData: SocialContributionEmployer[] = [];

  constructor(private socialContributionService: SocialContributionService,
              private matDialog: MatDialog,
              private notificationService: NotificationServiceService){
                this.notificationService.notification$
                .pipe(takeUntil(this.destroy$))
                .subscribe(res => {
                  if(res == NotificationTypes.REFRESH_TAXES_EMPLOYER){
                    this.loadTaxes();
                  }
                });
              }

  openAddTaxPage(e: any) {
    if(e == null){
      this.matDialog.open(TaxesEmployerAddEditComponent,{
        width: '500px',
      });
    }
    else{
      this.matDialog.open(TaxesEmployerAddEditComponent,{
        data:e.data,
        width: '500px',
      });
    }
  }

  onEditBtnClicked(e: any){
    this.openAddTaxPage(e);
  }

  onDeleteBtnClicked(e: any){
    this.matDialog.open(TaxesEmployerDeleteComponent, {
      data:e.data,
      width: '500px',
    });
  }

  ngOnInit():void{
    this.loadTaxes();
  }

  ngOnDestroy():void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadTaxes(){
    this.socialContributionService.socialContributionsEmployer().subscribe(res => {
      this.rowData = res;
    })
  }
}
