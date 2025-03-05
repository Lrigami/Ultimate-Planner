import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseButtonComponent } from './close-button.component';

describe('CloseButtonComponent', () => {
  let component: CloseButtonComponent;
  let fixture: ComponentFixture<CloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
