import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDataComponent } from './calendar-data.component';

describe('CalendarDataComponent', () => {
  let component: CalendarDataComponent;
  let fixture: ComponentFixture<CalendarDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
