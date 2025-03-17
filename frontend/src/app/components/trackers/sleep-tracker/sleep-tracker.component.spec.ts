import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTrackerComponent } from './sleep-tracker.component';

describe('SleepTrackerComponent', () => {
  let component: SleepTrackerComponent;
  let fixture: ComponentFixture<SleepTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
