import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDeleteComponent } from './tax-delete.component';

describe('TaxDeleteComponent', () => {
  let component: TaxDeleteComponent;
  let fixture: ComponentFixture<TaxDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxDeleteComponent]
    });
    fixture = TestBed.createComponent(TaxDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
