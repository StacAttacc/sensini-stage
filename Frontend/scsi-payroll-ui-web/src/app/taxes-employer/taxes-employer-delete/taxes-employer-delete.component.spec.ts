import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesEmployerDeleteComponent } from './taxes-employer-delete.component';

describe('TaxesEmployerDeleteComponent', () => {
  let component: TaxesEmployerDeleteComponent;
  let fixture: ComponentFixture<TaxesEmployerDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxesEmployerDeleteComponent]
    });
    fixture = TestBed.createComponent(TaxesEmployerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
