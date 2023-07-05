import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesEmployerComponent } from './taxes-employer.component';

describe('TaxesEmployerComponent', () => {
  let component: TaxesEmployerComponent;
  let fixture: ComponentFixture<TaxesEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxesEmployerComponent]
    });
    fixture = TestBed.createComponent(TaxesEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
