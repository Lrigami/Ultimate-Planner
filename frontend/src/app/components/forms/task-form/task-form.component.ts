import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  imports: [ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() isFormVisible = new EventEmitter<any>();

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required), // Champ obligatoire
  });

  closeForm() {
    this.isFormVisible.emit(false);
  }

  openNewTagForm() {
    
  }
}
