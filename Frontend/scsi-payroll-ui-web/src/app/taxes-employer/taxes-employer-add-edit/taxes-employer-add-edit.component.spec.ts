import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesEmployerAddEditComponent } from './taxes-employer-add-edit.component';

describe('TaxesEmployerAddEditComponent', () => {
  let component: TaxesEmployerAddEditComponent;
  let fixture: ComponentFixture<TaxesEmployerAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxesEmployerAddEditComponent]
    });
    fixture = TestBed.createComponent(TaxesEmployerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
