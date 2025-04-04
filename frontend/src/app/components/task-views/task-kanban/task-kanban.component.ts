import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../models/task.model';
import { Tag } from '../../../models/tag.model';
import { TaskService } from '../../../services/task.service';
import { TagService } from '../../../services/tags.service';
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
  @ViewChild(TaskCardComponent) taskCardComponent!: TaskCardComponent;

  kanbanCategories: string[] = [];
  tasks: Task[] = [];
  tasksByCategory: { [key: string]: Task[]} = {};
  taskTagsMap: { [taskId: number]: Tag[] } = {};

  constructor (public taskService: TaskService, public tagService: TagService) {}

  ngOnInit() {
    this.getAllKanban();
    this.taskService.setTodolistId();
    this.loadTasks();
  }

  // get all existing kanban categories in enum type
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
  
  async loadTasks() {
    try {
      const tasks = await this.taskService.getAllTasks().toPromise();
      this.tasks = tasks;
      this.taskTagsMap = {};

      const tagRequests = this.tasks.map(task =>
        this.tagService.getTagFromTask(task.id).toPromise().then(tags => {
          this.taskTagsMap[task.id] = tags; 
        }).catch(error => console.error(`Error fetching tags for task ${task.id}:`, error))
      );

      await Promise.all(tagRequests);
      this.organizeTasksByCategory();
      this.sortTasks();
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  }

  sortTasks() {
    this.tasks.sort((a, b) => a.sort_order - b.sort_order);
    this.organizeTasksByCategory();
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
    this.organizeTasksByCategory();
  }

  organizeTasksByCategory() {
    this.tasksByCategory = {};
    this.kanbanCategories.forEach(category => {
      this.tasksByCategory[category] = this.tasks.filter(task => task.kanban_category === category);
    });
  }

  // apply selected filters
  async filterTasks(priorityArray: [], chosenOperator: string, dueDateArray: []) {
    await this.loadTasks();
    this.applyFilters(priorityArray, chosenOperator, dueDateArray);
  }

  private applyFilters(priorityArray: [], chosenOperator: string, dueDateArray: []) {
    const priority = priorityArray;
    const operator = chosenOperator;
    const duedate = dueDateArray;
    this.taskService.filterTask({ priority, operator, duedate }).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.organizeTasksByCategory();
      },
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

  // when the user drops a card, the card data is updated (category, done or not, sort_order)
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

  // update the task in database after drag and drop
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
