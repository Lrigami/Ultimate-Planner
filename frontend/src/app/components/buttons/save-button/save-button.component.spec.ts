import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveButtonComponent } from './save-button.component';

describe('SaveButtonComponent', () => {
  let component: SaveButtonComponent;
  let fixture: ComponentFixture<SaveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
