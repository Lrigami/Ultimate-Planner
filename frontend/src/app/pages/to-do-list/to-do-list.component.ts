import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskListComponent } from '../../components/task-views/task-list/task-list.component';
import { TaskFormComponent } from '../../components/forms/task-form/task-form.component';
import { DeleteFormComponent } from '../../components/forms/delete-form/delete-form.component';

@Component({
  selector: 'to-do-list',
  imports: [CommonModule, TaskListComponent, TaskFormComponent, DeleteFormComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  selectedTask: Task | null = null;

  isAddFormVisible = false;
  isEditFormVisible = false;
  isDeleteFormVisible = false;

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
    if (this.taskListComponent) {
      this.taskListComponent.loadTasks();
    }
  }
}
