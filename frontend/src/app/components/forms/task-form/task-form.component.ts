import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';
import { SaveFormComponent } from '../save-form/save-form.component';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-form',
  imports: [ButtonComponent, SaveFormComponent, TagFormComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() isFormVisible = new EventEmitter<any>();
  isSaveFormVisible = false;
  isTagFormVisible = false;

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required), // Champ obligatoire
  });

  closeForm() {
    this.isSaveFormVisible = true;
    this.isFormVisible.emit(false);
  }

  openNewTagForm() {
    this.isTagFormVisible = true;
  }

  handleSaveFormClose(dataResponse: boolean) {
    if (dataResponse) {
      // gérer l'enregistrement des données de la tâche ici parce que les données sont ici dans task-form
    }
    this.isSaveFormVisible = false;
  }

  handleTagFormClose(dataResponse: boolean) {
    if (dataResponse) {
      // actualiser la liste des tags dans task-card pour qu'il apparaisse et soit sélectionnable par l'utilisateur directement
    }
    this.isTagFormVisible = false;
  }
}
