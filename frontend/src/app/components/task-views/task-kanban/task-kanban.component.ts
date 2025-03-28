import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'task-kanban',
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag, TaskCardComponent, ButtonComponent],
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
  tasksByCategory: { [key: string]: Task[]} = {};

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
        this.organizeTasksByCategory();
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
          this.organizeTasksByCategory();
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

  sortTasks() {
    this.tasks.sort((a, b) => a.sort_order - b.sort_order);
  }

  organizeTasksByCategory() {
    this.tasksByCategory = {};
    this.kanbanCategories.forEach(category => {
      this.tasksByCategory[category] = this.tasks.filter(task => task.kanban_category === category);
    });
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

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex -1, event.currentIndex - 1);
      this.updateSortOrder(event.container.data);
    } else {
      const task = event.previousContainer.data[event.previousIndex - 1];
      if (!task) return;
  
      const newCategory = this.kanbanCategories.find(category =>
        this.tasksByCategory[category] === event.container.data
      );
      console.log("new category: ", newCategory);
  
      if (newCategory) {
        task.kanban_category = newCategory;
        task.done = newCategory === "done";
      }
  
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex - 1,
        event.currentIndex - 1
      );

      this.tasksByCategory[task.kanban_category ? task.kanban_category : 'to-do' ] = event.container.data;

      this.updateSortOrder(event.container.data);
    }
  }

  updateSortOrder(updatedTasks: Task[]) {
    const updatedTasksArray = updatedTasks.map((task, index) => ({
      id: task.id,
      kanban_category: task.kanban_category,
      done: task.done,
      sort_order: index + 1
    }));
    
    this.taskService.updateTaskOrder(updatedTasksArray).subscribe();
  }
}
