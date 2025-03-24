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
    this.taskService.setTodolistId();
    this.loadTasks();
  }

  loadTasks(): Promise<void>{
    return new Promise ((resolve, reject) => {
      this.taskService.getAllTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.sortTasks();
          resolve();
        },
        error: (error) => {
          console.error("Error fetching tasks: ", error);
          reject(new Error(error));
        }
      });
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

  sortTasks() {
    this.tasks.sort((a, b) => b.id - a.id);
    const taskNotDone = this.tasks.filter(task => !task.done);
    const taskDone = this.tasks.filter(task => task.done);
    this.tasks = [...taskNotDone, ...taskDone];
  }

  async filterTasks(priorityArray: [], chosenOperator: string, dueDateArray: []) {
    await this.loadTasks();
    this.applyFilters(priorityArray, chosenOperator, dueDateArray);
  }

  private applyFilters(priorityArray: [], chosenOperator: string, dueDateArray: []) {
    const priority = priorityArray;
    const operator = chosenOperator;
    const duedate = dueDateArray;
    this.taskService.filterTask({ priority, operator, duedate }).subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error(error)
    });
    this.sortTasks();
  }
}
