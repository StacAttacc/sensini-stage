import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithheldSalaryComponent } from './withheld-salary.component';

describe('WithheldSalaryComponent', () => {
  let component: WithheldSalaryComponent;
  let fixture: ComponentFixture<WithheldSalaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithheldSalaryComponent]
    });
    fixture = TestBed.createComponent(WithheldSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
