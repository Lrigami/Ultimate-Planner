import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListFormComponent } from './to-do-list-form.component';

describe('ToDoListFormComponent', () => {
  let component: ToDoListFormComponent;
  let fixture: ComponentFixture<ToDoListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
