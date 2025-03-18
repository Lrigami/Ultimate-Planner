import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { ButtonComponent } from '../../buttons/button.component';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() updatedTask = new EventEmitter<boolean>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() createTask = new EventEmitter<any>();
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.setTodolistId(1);
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => console.error("Error fetching tasks:", error)
    });
  }

  onEdit(task: Task) {
    this.editTask.emit(task); // Émet un événement vers le parent
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task); // Émet un événement vers le parent
  }

  onCreate() {
    this.createTask.emit();
  }
}
