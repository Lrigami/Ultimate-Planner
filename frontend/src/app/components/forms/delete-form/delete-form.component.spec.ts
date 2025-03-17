import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFormComponent } from './delete-form.component';

describe('DeleteFormComponent', () => {
  let component: DeleteFormComponent;
  let fixture: ComponentFixture<DeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
