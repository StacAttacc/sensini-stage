import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentDeleteComponent } from './government-delete.component';

describe('GovernmentDeleteComponent', () => {
  let component: GovernmentDeleteComponent;
  let fixture: ComponentFixture<GovernmentDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GovernmentDeleteComponent]
    });
    fixture = TestBed.createComponent(GovernmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
