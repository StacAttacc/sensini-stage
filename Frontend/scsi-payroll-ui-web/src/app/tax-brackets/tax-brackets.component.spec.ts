import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBracketsComponent } from './tax-brackets.component';

describe('TaxBracketsComponent', () => {
  let component: TaxBracketsComponent;
  let fixture: ComponentFixture<TaxBracketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxBracketsComponent]
    });
    fixture = TestBed.createComponent(TaxBracketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
