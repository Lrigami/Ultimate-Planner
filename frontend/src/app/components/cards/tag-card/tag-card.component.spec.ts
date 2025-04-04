import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCardComponent } from './tag-card.component';

describe('TagCardComponent', () => {
  let component: TagCardComponent;
  let fixture: ComponentFixture<TagCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
