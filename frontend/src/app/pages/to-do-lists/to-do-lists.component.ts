import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todolist } from '../../models/todolist.model';
import { TodolistService } from '../../services/to-do-list.service';
// importer title component, title form, to do list form
import { ButtonComponent } from '../../components/buttons/button.component';
import { ToDoListCardComponent } from '../../components/cards/to-do-list-card/to-do-list-card.component';

@Component({
  selector: 'to-do-lists',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ToDoListCardComponent],
  templateUrl: './to-do-lists.component.html',
  styleUrl: './to-do-lists.component.css'
})
export class ToDoListsComponent {
  @Output() createList = new EventEmitter<any>();
  @Output() editList = new EventEmitter<Todolist>();
  @Output() deleteList = new EventEmitter<Todolist>();

  todolists: Todolist[] = [];
  totalTasksMap: { [key: number]: number } = {};
  totalDoneTasksMap: { [key: number]: number } = {};
  tasksPercentage: { [key: number]: number } = {};

  constructor(private todolistService: TodolistService) {}

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.todolistService.getAllLists().subscribe({
      next: (lists) => {
        this.todolists = lists;
        this.countTasksAndDoneTasks();
      },
      error: (error) => console.error("Error fetching to-do lists: ", error)
    });
  }

  onEdit(list: Todolist) {
    this.editList.emit(list);
  }

  onDelete(list: Todolist) {
    this.deleteList.emit(list);
  }

  onCreate() {
    this.createList.emit();
  }

  countTasksAndDoneTasks() {
    let pendingRequests = this.todolists.length * 2;
  
    this.todolists.forEach((list) => {
      this.todolistService.countTasksInList(list.id).subscribe({
        next: (total) => {
          this.totalTasksMap[list.id] = total;
          pendingRequests--;
          this.checkAndCalculatePercentage(pendingRequests);
        },
        error: (error) => console.error(`Erreur de comptage des tâches pour la liste ${list.id}: `, error)
      });

      this.todolistService.countDoneTasksInList(list.id).subscribe({
        next: (done) => {
          this.totalDoneTasksMap[list.id] = done;
          pendingRequests--;
          this.checkAndCalculatePercentage(pendingRequests);
        },
        error: (error) => console.error(`Erreur de comptage des tâches terminées pour la liste ${list.id}: `, error)
      });
    });
  }
  
  checkAndCalculatePercentage(pendingRequests: number) {
    if (pendingRequests === 0) {
      this.calculateTasksPercentage();
    }
  }

  calculateTasksPercentage() {
    this.todolists.forEach((list) => {
      const totalTasks = this.totalTasksMap[list.id];
      const doneTasks = this.totalDoneTasksMap[list.id];
      if (totalTasks === 0) {
        this.tasksPercentage[list.id] = 0.0; // Évite NaN
      } else {
        this.tasksPercentage[list.id] = Number(((doneTasks / totalTasks) * 100).toFixed(0));
      }
    })
  }
}
