import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  constructor(private observer: BreakpointObserver, private changeDetectorRef: ChangeDetectorRef){

  }


  ngAfterViewInit(){
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if(res.matches){
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else{
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
