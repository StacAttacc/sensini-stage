import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernentComponent } from './governent.component';

describe('GovernentComponent', () => {
  let component: GovernentComponent;
  let fixture: ComponentFixture<GovernentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GovernentComponent]
    });
    fixture = TestBed.createComponent(GovernentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
