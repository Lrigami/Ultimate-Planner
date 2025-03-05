import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackersStatisticsComponent } from './trackers-statistics.component';

describe('TrackersStatisticsComponent', () => {
  let component: TrackersStatisticsComponent;
  let fixture: ComponentFixture<TrackersStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackersStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
