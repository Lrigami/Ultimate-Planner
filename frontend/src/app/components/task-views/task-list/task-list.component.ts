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
          reject(error);
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

  async filterTasks(priorityArray: [], dueDateArray: []) {
    await this.loadTasks();
    this.applyFilters(priorityArray, dueDateArray);
  }

  private applyFilters(priorityArray: [], dueDateArray: []) {

    let keptTasks: Task[] = [];

    if (priorityArray.length > 0) {
      priorityArray.forEach(priority => {
        const priorityTasks = this.tasks.filter(task => task.priority === priority);
        keptTasks.push(...priorityTasks);
      });
    }

    if (dueDateArray.length > 0) {
      dueDateArray.forEach(duedate => {
        if (duedate === "today") {
          const dateTasks = this.tasks.filter(task => task.due_date? new Date(task.due_date).toDateString() == this.addDays(new Date(), 0).toDateString() : null);
          keptTasks.push(...dateTasks);
        } else if (duedate === "tomorrow") {
          const dateTasks = this.tasks.filter(task => task.due_date? new Date(task.due_date).toDateString() == this.addDays(new Date(), 1).toDateString() : null);
          keptTasks.push(...dateTasks);
        } else if (duedate === "this week") {
          const today = this.addDays(new Date(), 0);
          const remainingDays = 6 - new Date().getDay();
          const endOfWeek = this.addDays(new Date(), remainingDays);
          const dateTasks = this.tasks.filter(task => task.due_date ? new Date(task.due_date).getFullYear() === today.getFullYear() && new Date(task.due_date).getMonth() === today.getMonth() && new Date(task.due_date).getDate() >= today.getDate() && new Date(task.due_date).getDate() <= endOfWeek.getDate() : null);
          keptTasks.push(...dateTasks);
        } else if (duedate === "this month") {
          const thismonth = new Date().getMonth();
          const dateTasks = this.tasks.filter(task => task.due_date? new Date(task.due_date).getMonth() === thismonth : null);
          keptTasks.push(...dateTasks);
        }
      })
    }
    
    if (priorityArray.length === 0 && dueDateArray.length === 0 ){
      this.tasks = this.tasks;
    } else {
      this.tasks = [...keptTasks];
    }

    const idList: number[] = [];
    const finalTasks: Task[] = [];
    this.tasks.forEach(task => {
      if (!idList.includes(task.id)) {
        idList.push(task.id);
        finalTasks.push(task);
      }
    });

    this.tasks = [...finalTasks];

    this.sortTasks();
  }

  addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
