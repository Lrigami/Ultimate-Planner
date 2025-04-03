import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonToggle, MatButtonToggleGroup,MatButtonToggleChange } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TodolistService } from '../../services/to-do-list.service';
import { TaskService } from '../../services/task.service';
import { ButtonComponent } from '../../components/buttons/button.component';
import { TaskListComponent } from '../../components/task-views/task-list/task-list.component';
import { TaskKanbanComponent } from '../../components/task-views/task-kanban/task-kanban.component';
import { TaskFormComponent } from '../../components/forms/task-form/task-form.component';
import { DeleteFormComponent } from '../../components/forms/delete-form/delete-form.component';

@Component({
  selector: 'to-do-list',
  imports: [CommonModule, RouterLink, MatSelectModule, MatButtonToggle, MatButtonToggleGroup, FormsModule, ReactiveFormsModule, ButtonComponent, TaskListComponent, TaskKanbanComponent, TaskFormComponent, DeleteFormComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  @ViewChild(TaskKanbanComponent) taskKanbanComponent!: TaskKanbanComponent;

  priorityLevels: string[] = [];
  selectedPriority: [] = [];
  selectedDueDate: [] = [];

  selectedTask: Task | null = null;
  selectedKanban: string = '';
  listTitle: string = '';
  sortingParameter: string = '';
  chosenOperator: string = "AND";
  chosenView: string = "list";
  isAddFormVisible = false;
  isAddKanbanFormVisible = false;
  isEditFormVisible = false;
  isDeleteFormVisible = false;
  isAscending: boolean = true;

  priority = new FormControl('');
  dueDate = new FormControl('');
  sortingParameters = new FormControl('');

  constructor (public taskService: TaskService, public todolistService: TodolistService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.taskService.getAllPriority().subscribe({
      next: (allPriority) => this.priorityLevels = allPriority,
      error: (error) => console.error("Get Priority failed: ", error)
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadList();
      }
    })
  }

  loadList() {
    const listId = this.route.snapshot.paramMap.get('tdlid');
    if (listId) {
      this.todolistService.getList(Number(listId)).subscribe({
        next: (list) => {
          this.listTitle = list[0].title;
        },
        error: (error) => console.error("Error loading list:", error)
      });
    }
  }

  openNewTaskForm() {
    if(this.isDeleteFormVisible || this.isEditFormVisible || this.isAddKanbanFormVisible) {
      return;
    }
    this.isAddFormVisible = true;
  }

  openNewTaskKanbanForm(kanban: string) {
    if (this.isDeleteFormVisible || this.isEditFormVisible || this.isAddFormVisible) {
      return;
    }
    this.selectedKanban = kanban;
    this.isAddKanbanFormVisible = true;
  }

  openEditForm(task: Task) {
    if(this.isDeleteFormVisible || this.isAddFormVisible || this.isAddKanbanFormVisible) {
      return;
    }
    this.selectedTask = task;
    this.isEditFormVisible = true;
  }

  openDeleteForm(task: Task) {
    if(this.isEditFormVisible || this.isAddFormVisible || this.isAddKanbanFormVisible) {
      return;
    }
    this.selectedTask = task;
    this.isDeleteFormVisible = true;
  }

  handleFormClose() {
    this.isEditFormVisible = false;
    this.isDeleteFormVisible = false;
    this.isAddFormVisible = false;
    this.isAddKanbanFormVisible = false;
    if (this.taskListComponent) {
      this.taskListComponent.loadTasks();
    } else if (this.taskKanbanComponent) {
      this.taskKanbanComponent.loadTasks();
    }
  }

  // Filtering tasks
  onPriorityChange(event: MatSelectChange) {
    this.selectedPriority = event.value;
    this.filterTasks();
  }

  onDueDateChange(event: MatSelectChange) {
    this.selectedDueDate = event.value;
    this.filterTasks();
  }

  onOperatorChange(event: MatButtonToggleChange) {
    this.chosenOperator = event.value;
    this.filterTasks();
  }

  onViewChange(event: MatButtonToggleChange) {
    this.chosenView = event.value;
  }

  async filterTasks() {
    this.taskListComponent ? await this.taskListComponent.filterTasks(this.selectedPriority, this.chosenOperator, this.selectedDueDate) : await this.taskKanbanComponent.filterTasks(this.selectedPriority, this.chosenOperator, this.selectedDueDate);
  }

  // Sorting tasks
  onParameterChange(event: MatSelectChange) {
    this.sortingParameter = event.value;
    this.sortTasks();
  }

  onOrderChange() {
    this.isAscending = !this.isAscending;
    this.sortTasks();
  }

  async sortTasks() {
    this.taskListComponent ? this.taskListComponent.sortTasksByParameter(this.sortingParameter, this.isAscending) : this.taskKanbanComponent.sortTasksByParameter(this.sortingParameter, this.isAscending);
  }
}
