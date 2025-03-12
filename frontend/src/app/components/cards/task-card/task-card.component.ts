import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../buttons/button.component';
import { DeleteFormComponent } from '../../forms/delete-form/delete-form.component';
import { TaskFormComponent } from '../../forms/task-form/task-form.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-card',
  imports: [FormsModule, ButtonComponent, DeleteFormComponent, CommonModule, TaskFormComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit, OnChanges {
  // Input pour passer des informations du parent vers l'enfant : par exemple de task-card à task-form
  @Input() task!: { id: number, title: string, description?: string, priority?: string, kanban_category?: string, due_date?: Date };
  @Output() taskUpdated = new EventEmitter<void>();
  refreshList = new EventEmitter<void>();
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
    this.updateCard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.updateCard();
    }
  }

  updateCard() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.priority = this.task.priority;
    this.kanban_category = this.task.kanban_category;
    this.due_date = this.task.due_date;
  }

  updateTaskCard(update: Event) {
      this.updateCard();
  }
  
  //Method pour afficher les formulaires :
  displayEditForm() {
    this.isEditFormVisible = true;
  }

  handleEditFormClose(response: boolean) {
    if(response) {
      let id = this.task.id;
      this.taskService.getTask(id).subscribe({
        next: (updatedTask) => {
          this.task = updatedTask;
          this.taskUpdated.emit();
          this.refreshList.emit();
          this.isEditFormVisible = false;
        },
        error: (error) => console.error("Cannot get task: ", error)
      });
    } else {
      this.isEditFormVisible = false;
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
