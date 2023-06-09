import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBracketsAddEditComponent } from './tax-brackets-add-edit.component';

describe('TaxBracketsAddEditComponent', () => {
  let component: TaxBracketsAddEditComponent;
  let fixture: ComponentFixture<TaxBracketsAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxBracketsAddEditComponent]
    });
    fixture = TestBed.createComponent(TaxBracketsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
