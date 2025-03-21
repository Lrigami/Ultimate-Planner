import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'task-kanban',
  imports: [CommonModule, TaskCardComponent, ButtonComponent],
  templateUrl: './task-kanban.component.html',
  styleUrl: './task-kanban.component.css'
})
export class TaskKanbanComponent {
  @Input() updatedTask = new EventEmitter<boolean>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() createTask = new EventEmitter<any>();

  kanbanCategories: string[] = [];
  tasks: Task[] = [];

  constructor (public taskService: TaskService) {}

  ngOnInit() {
    this.getAllKanban();
    this.taskService.setTodolistId();
    this.loadTasks();
  }

  getAllKanban() {
    this.taskService.getAllKanban().subscribe({
      next: (kanban_category) => {
        this.kanbanCategories = kanban_category;
        this.sortTasks();
      },
      error: (error) => console.error(error)
    });
  }

  loadTasks(): Promise<void>{
    return new Promise ((resolve, reject) => {
      this.taskService.getAllTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          resolve();
        },
        error: (error) => {
          console.error("Error fetching tasks: ", error);
          reject(new Error(error));
        }
      });
    });
  }

  sortTasks() {
    this.tasks.sort((a, b) => b.id - a.id);
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task); 
  }

  onCreate(kanban: string) {
    this.createTask.emit(kanban);
  }
}
