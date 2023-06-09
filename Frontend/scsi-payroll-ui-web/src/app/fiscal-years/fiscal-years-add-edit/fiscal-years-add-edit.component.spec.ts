import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearsAddEditComponent } from './fiscal-years-add-edit.component';

describe('FiscalYearsAddEditComponent', () => {
  let component: FiscalYearsAddEditComponent;
  let fixture: ComponentFixture<FiscalYearsAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiscalYearsAddEditComponent]
    });
    fixture = TestBed.createComponent(FiscalYearsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
