import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBracketsDeleteComponent } from './tax-brackets-delete.component';

describe('TaxBracketsDeleteComponent', () => {
  let component: TaxBracketsDeleteComponent;
  let fixture: ComponentFixture<TaxBracketsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxBracketsDeleteComponent]
    });
    fixture = TestBed.createComponent(TaxBracketsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
