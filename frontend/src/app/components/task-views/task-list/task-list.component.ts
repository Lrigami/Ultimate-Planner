import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../../models/task.model';
import { Tag } from '../../../models/tag.model';
import { TaskService } from '../../../services/task.service';
import { TagService } from '../../../services/tags.service';
import { ButtonComponent } from '../../buttons/button.component';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, ButtonComponent, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() updatedTask = new EventEmitter<boolean>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() createTask = new EventEmitter<any>();
  private sub!: Subscription;

  listId!: string;
  tasks: Task[] = [];
  taskTagsMap: { [taskId: number]: Tag[] } = {};

  constructor(private taskService: TaskService, private route: ActivatedRoute, private tagService: TagService) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => { 
      this.listId = params.get('tdlid')!;
      this.taskService.setTodolistId();
      this.loadTasks();
    });
  }

  ngOnDestroy(): void {
     this.sub.unsubscribe();
  }

  loadTasks(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.taskService.getAllTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.taskTagsMap = {};
  
          const tagRequests = this.tasks.map(task => 
            this.tagService.getTagFromTask(task.id).toPromise().then(tags => {
              this.taskTagsMap[task.id] = tags;
            }).catch(error => {
              console.error(`Error fetching tags for task ${task.id}:`, error);
            })
          );
  
          Promise.all(tagRequests).then(() => {
            this.sortTasks();
            resolve();
          });
        },
        error: (error) => {
          console.error("Error fetching tasks: ", error);
          reject(new Error(error));
        }
      });
    });
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task);
  }

  onCreate() {
    this.createTask.emit();
  }

  sortTasks() {
    this.tasks.sort((a, b) => a.sort_order - b.sort_order);
    const taskNotDone = this.tasks.filter(task => !task.done);
    const taskDone = this.tasks.filter(task => task.done);
    this.tasks = [...taskNotDone, ...taskDone];
  }

  // update tasks display by selected sorting parameters but does not update the sorting order in database
  sortTasksByParameter(sortingParameter: string, isAscending: boolean) {
    if (sortingParameter == 'priority') {
      const taskHigh = this.tasks.filter(task => task.priority === 'high');
      const taskMedium = this.tasks.filter(task => task.priority === 'medium');
      const taskLow = this.tasks.filter(task => task.priority === 'low');
      this.tasks = isAscending ? [...taskLow, ...taskMedium, ...taskHigh] : [...taskHigh, ...taskMedium, ...taskLow];
    } else if (sortingParameter == 'due_date') {
      const dueDateTasks = this.tasks.filter((task): task is Task & { due_date: Date } => !!task.due_date);
      const noDueDateTasks = this.tasks.filter(task => !task.due_date);
      if (isAscending) {
        dueDateTasks.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
        this.tasks = [...noDueDateTasks, ...dueDateTasks];
      } else {
        dueDateTasks.sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());
        this.tasks = [...dueDateTasks, ...noDueDateTasks];
      }
    } else if (sortingParameter == 'created_at') {
      if (isAscending) {
        this.tasks.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      } else {
        this.tasks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } else {
      this.loadTasks();
    }
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

  drop(event: CdkDragDrop<Task[]>) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateSortOrder(event.container.data);
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
