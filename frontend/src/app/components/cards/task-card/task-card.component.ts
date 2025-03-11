import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../buttons/button.component';
import { DeleteFormComponent } from '../../forms/delete-form/delete-form.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-card',
  imports: [FormsModule, ButtonComponent, DeleteFormComponent, TaskService],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  // Input pour passer des informations du parent vers l'enfant : par exemple de task-card à task-form
  @Input() task!: { id: number, title: string, description?: string, priority?: 
  string, kanban_category?: string, due_date?: Date };
  @Output() taskUpdated = new EventEmitter<void>();
  title?: string;
  description?: string;
  kanban_category?: string = "to-do";
  due_date?: Date;
  priority?: string;
  // tag?: string = "tag-test";
  isEditFormVisible = false;
  isDeleteFormVisible = false;

  constructor(public taskService: TaskService) {}

  // task-card doit gérer l'affichage des données de la carte concernée

  // Actions du formulaire (cliquer sur Save / Cancel / Close) ne sont pas gérées ici. Lorsque la carte est ajoutée, form envoie des données ici via un @ouput

  ngOnInit() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.priority = this.task.priority;
    this.kanban_category = this.task.kanban_category;
    this.due_date = this.task.due_date;
  }
  
  //Method pour afficher les formulaires :
  displayEditForm() {
    this.isEditFormVisible = true;
  }

  handleEditFormClose(response: boolean) {
    if(response) {
      let id = this.task.id;
      this.taskService.getTask(id).subscribe({
        next: () => {
          this.taskUpdated.emit();
          this.isEditFormVisible = false;
        },
        error: (error) => console.error("Cannot get task: ", error)
      });
    }
  }

  displayDeleteForm() {
    this.isDeleteFormVisible = true;
  }

  handleDeleteFormClose(deleteResponse: boolean) {
    if (deleteResponse) {
      let id = this.task.id;
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          console.log("Task updated successfully");
          this.taskUpdated.emit();
          this.isDeleteFormVisible = false;
        },
        error: (error) => console.error("Update failed: ", error)
      });
    }
  }
}
