import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todolist } from '../../models/todolist.model';
import { TodolistService } from '../../services/to-do-list.service';
// importer title component, title form, to do list form
import { ButtonComponent } from '../../components/buttons/button.component';
import { ToDoListCardComponent } from '../../components/cards/to-do-list-card/to-do-list-card.component';

@Component({
  selector: 'to-do-lists',
  imports: [CommonModule, ButtonComponent, ToDoListCardComponent],
  templateUrl: './to-do-lists.component.html',
  styleUrl: './to-do-lists.component.css'
})
export class ToDoListsComponent {
  @Output() createList = new EventEmitter<any>();
  @Output() editList = new EventEmitter<Todolist>();
  @Output() deleteList = new EventEmitter<Todolist>();

  todolists: Todolist[] = [];

  constructor(private todolistService: TodolistService) {}

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.todolistService.getAllLists().subscribe({
      next: (lists) => {
        this.todolists = lists;
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

  goToList() {
    // remplir cette fonction
  }
}
