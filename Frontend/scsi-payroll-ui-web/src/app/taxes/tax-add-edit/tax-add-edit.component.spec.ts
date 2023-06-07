import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAddEditComponent } from './tax-add-edit.component';

describe('TaxAddEditComponent', () => {
  let component: TaxAddEditComponent;
  let fixture: ComponentFixture<TaxAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxAddEditComponent]
    });
    fixture = TestBed.createComponent(TaxAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
