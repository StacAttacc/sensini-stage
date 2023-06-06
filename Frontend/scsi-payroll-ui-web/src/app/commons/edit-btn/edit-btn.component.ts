import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent implements ICellRendererAngularComp{
  private params: any;

  agInit(params: any/*ICellRendererParams<any, any, any>*/): void {
    this.params = params;
  }
  
  refresh(params: any/*ICellRendererParams<any, any, any>*/): boolean {
    return false;
  }

  onClick($event: any){
    if(this.params.onClick instanceof Function){
      this.params.onClick(this.params);
    }
  }

}
