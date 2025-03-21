import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonToggle, MatButtonToggleGroup,MatButtonToggleChange } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TodolistService } from '../../services/to-do-list.service';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../../components/task-views/task-list/task-list.component';
import { TaskKanbanComponent } from '../../components/task-views/task-kanban/task-kanban.component';
import { TaskFormComponent } from '../../components/forms/task-form/task-form.component';
import { DeleteFormComponent } from '../../components/forms/delete-form/delete-form.component';

@Component({
  selector: 'to-do-list',
  imports: [CommonModule, MatSelectModule, MatButtonToggle, MatButtonToggleGroup, FormsModule, ReactiveFormsModule, TaskListComponent, TaskKanbanComponent, TaskFormComponent, DeleteFormComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  @ViewChild(TaskKanbanComponent) taskKanbanComponent!: TaskKanbanComponent;
  selectedTask: Task | null = null;
  selectedKanban: string = '';
  priorityLevels: string[] = [];
  priority = new FormControl('');
  dueDate = new FormControl('');
  listTitle: string = '';

  isAddFormVisible = false;
  isAddKanbanFormVisible = false;
  isEditFormVisible = false;
  isDeleteFormVisible = false;

  selectedPriority: [] = [];
  selectedDueDate: [] = [];
  chosenOperator: string = "AND";
  chosenView: string = "list";

  constructor (public taskService: TaskService, public todolistService: TodolistService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskService.getAllPriority().subscribe({
      next: (allPriority) => this.priorityLevels = allPriority,
      error: (error) => console.error("Get Priority failed: ", error)
    });
    this.route.paramMap.subscribe(params => {
      const listId = params.get('tdlid');
      this.todolistService.getList(Number(listId)).subscribe({
        next: (list) => {
          this.listTitle = list[0].title;
        },
        error: (error) => console.error("Get list title failed: ", error)
      });
    });
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

  async filterTasks() {
    if (this.taskListComponent) {
      await this.taskListComponent.filterTasks(this.selectedPriority, this.chosenOperator, this.selectedDueDate);
    } else if (this.taskKanbanComponent) {
      await this.taskKanbanComponent.filterTasks(this.selectedPriority, this.chosenOperator, this.selectedDueDate);
    }
  }

  onViewChange(event: MatButtonToggleChange) {
    this.chosenView = event.value;
  }
}
