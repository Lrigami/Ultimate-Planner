import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodolistService } from '../../../services/to-do-list.service';
import { ButtonComponent } from '../../buttons/button.component';
import { SaveFormComponent } from '../save-form/save-form.component';

@Component({
  selector: 'to-do-list-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveFormComponent, ButtonComponent],
  templateUrl: './to-do-list-form.component.html',
  styleUrl: './to-do-list-form.component.css'
})
export class ToDoListFormComponent {
  @Input() todolistData!: { id: number, title: string, pinned?: boolean };
  @Output() isFormVisible = new EventEmitter<boolean>();
  @Output() todolistUpdated = new EventEmitter<boolean>();

  todolistForm: FormGroup;
  isSaveFormVisible = false;

  constructor(public todolistService: TodolistService) {
    this.todolistForm = new FormGroup({
      title: new FormControl('', Validators.required),
      isPinned: new FormControl(false)
    })
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    if (this.todolistData) {
      this.todolistForm.patchValue({
        title: this.todolistData.title || '',
        isPinned: this.todolistData.pinned || false,
      })
    }
  }

  closeForm() {
    this.isFormVisible.emit(false);
  }

  openSaveForm() {
    this.isSaveFormVisible = true;
  }

  handleSaveFormClose(isSaved: boolean) {
    if (isSaved) {
      if (this.todolistData) {
        const updatedTodolist = {
          id: this.todolistData.id,
          title: this.todolistForm.value.title,
          pinned: this.todolistForm.value.isPinned,
          color: 'grey'
        };

        this.todolistService.updateList(updatedTodolist).subscribe({
          next: () => {
            this.todolistUpdated.emit(true);
            this.closeForm();
          },
          error: (error) => console.error("Update failed: ", error)
        });
      } else {
        const newList = {
          title: this.todolistForm.value.title,
          pinned: this.todolistForm.value.isPinned,
          color: 'grey'
        };

        console.log(newList);

        this.todolistService.createList(newList).subscribe({
          next: () => {
            this.todolistUpdated.emit(true);
            this.closeForm();
          },
          error: (error) => console.error("Create list failed: ", error)
        });
      }
    } else {
      this.closeForm();
    }
  }

}
