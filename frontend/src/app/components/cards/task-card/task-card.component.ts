import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../buttons/button.component';
import { DeleteFormComponent } from '../../forms/delete-form/delete-form.component';

@Component({
  selector: 'task-card',
  imports: [FormsModule, ButtonComponent, DeleteFormComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  // Input pour passer des informations du parent vers l'enfant : par exemple de task-card à task-form
  @Input() task!: { id: number, title: string, description?: string, priority?: string, kanban_category?: string, due_date?: Date };
  titre: string = "card test";
  description?: string;
  kanban_category?: string = "to-do";
  due_date?: Date;
  tag?: string = "tag-test";
  showEditForm: boolean = false;
  isDeleteFormVisible = false;

  // task-card doit gérer l'affichage des données de la carte concernée

  // Actions du formulaire (cliquer sur Save / Cancel / Close) ne sont pas gérées ici. Lorsque la carte est ajoutée, form envoie des données ici via un @ouput
  
  //Method pour afficher les formulaires :
  displayEditForm() {
    this.showEditForm = true;
  }

  displayDeleteForm() {
    this.isDeleteFormVisible = true;
  }

  handleDeleteFormClose(deleteResponse: boolean) {
    if (deleteResponse) {
      // gérer la suppression des données
    }
    this.isDeleteFormVisible = false;
  }
}
