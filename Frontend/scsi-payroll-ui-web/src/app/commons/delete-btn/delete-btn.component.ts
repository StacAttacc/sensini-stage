import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent {
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
