import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentAddEditComponent } from './government-add-edit.component';

describe('GovernmentAddEditComponent', () => {
  let component: GovernmentAddEditComponent;
  let fixture: ComponentFixture<GovernmentAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GovernmentAddEditComponent]
    });
    fixture = TestBed.createComponent(GovernmentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
