import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';
import { SaveFormComponent } from '../save-form/save-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  imports: [ButtonComponent, SaveFormComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() isFormVisible = new EventEmitter<any>();
  isSaveFormVisible = false;

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required), // Champ obligatoire
  });

  closeForm() {
    this.isSaveFormVisible = true;
    this.isFormVisible.emit(false);
  }

  openNewTagForm() {
    
  }

  handleSaveFormClose(dataResponse: boolean) {
    if (dataResponse) {
      // gérer l'enregistrement des données
    }
    this.isSaveFormVisible = false;
  }
}
