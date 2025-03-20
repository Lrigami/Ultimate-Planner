import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../../components/task-views/task-list/task-list.component';
import { TaskFormComponent } from '../../components/forms/task-form/task-form.component';
import { DeleteFormComponent } from '../../components/forms/delete-form/delete-form.component';

@Component({
  selector: 'to-do-list',
  imports: [CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule, TaskListComponent, TaskFormComponent, DeleteFormComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  selectedTask: Task | null = null;
  priorityLevels: string[] = [];
  priority = new FormControl('');
  dueDate = new FormControl('');

  isAddFormVisible = false;
  isEditFormVisible = false;
  isDeleteFormVisible = false;

  selectedPriority: [] = [];
  selectedDueDate: [] = [];

  constructor (public taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllPriority().subscribe({
      next: (allPriority) => this.priorityLevels = allPriority,
      error: (error) => console.error("Get Priority failed: ", error)
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
    if (this.taskListComponent) {
      this.taskListComponent.loadTasks();
    }
  }

  onPriorityChange(event: MatSelectChange) {
    this.selectedPriority = event.value;
    console.log("Priorités sélectionnées: ", this.selectedPriority);
    this.filterTasks();
  }

  onDueDateChange(event: MatSelectChange) {
    this.selectedDueDate = event.value;
    console.log("due date sélectionnées: ", this.selectedDueDate);
    this.filterTasks();
  }

  async filterTasks() {
    if (this.taskListComponent) {
      await this.taskListComponent.filterTasks(this.selectedPriority, this.selectedDueDate);
    }
  }
}
