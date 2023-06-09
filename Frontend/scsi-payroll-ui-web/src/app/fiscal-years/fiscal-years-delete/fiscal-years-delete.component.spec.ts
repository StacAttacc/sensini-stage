import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearsDeleteComponent } from './fiscal-years-delete.component';

describe('FiscalYearsDeleteComponent', () => {
  let component: FiscalYearsDeleteComponent;
  let fixture: ComponentFixture<FiscalYearsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiscalYearsDeleteComponent]
    });
    fixture = TestBed.createComponent(FiscalYearsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
