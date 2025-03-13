import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { ButtonComponent } from '../../buttons/button.component';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';
import { TaskFormComponent } from '../../forms/task-form/task-form.component';
import { DeleteFormComponent } from '../../forms/delete-form/delete-form.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskCardComponent, TaskFormComponent, DeleteFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isAddFormVisible = false;
  isEditFormVisible = false;
  isDeleteFormVisible = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error("Error fetching tasks:", error)
    });
  }

  openNewTaskForm() {
    if(this.isDeleteFormVisible || this.isEditFormVisible) {
      return;
    }
    this.isAddFormVisible = true;
  }

  openEditForm(task: Task) {
    if(this.isDeleteFormVisible || this.isAddFormVisible) {
      return;
    }
    this.selectedTask = task;
    this.isEditFormVisible = true;
  }

  openDeleteForm(task: Task) {
    if(this.isEditFormVisible || this.isAddFormVisible) {
      return;
    }
    this.selectedTask = task;
    this.isDeleteFormVisible = true;
  }

  handleFormClose() {
    this.isEditFormVisible = false;
    this.isDeleteFormVisible = false;
    this.isAddFormVisible = false;
    this.selectedTask = null;
    this.loadTasks(); // Rafraîchit la liste après modification ou suppression
  }
}
