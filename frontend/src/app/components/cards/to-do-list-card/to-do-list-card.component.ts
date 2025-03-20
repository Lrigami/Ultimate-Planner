import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Todolist } from '../../../models/todolist.model';
import { TodolistService } from '../../../services/to-do-list.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'to-do-list-card',
  imports: [RouterLink, CommonModule, ButtonComponent],
  templateUrl: './to-do-list-card.component.html',
  styleUrl: './to-do-list-card.component.css'
})
export class ToDoListCardComponent {
  // Input pour passer des informations du parent vers l'enfant : de to-do-list-list à to-do-list-card ici
  @Input() list!: Todolist;
  @Input() totalTasks!: number;
  @Input() totalDoneTasks!: number;
  @Input() percentage!: number;
  @Output() listId = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Todolist>();
  @Output() delete = new EventEmitter<Todolist>();

  title?: string; 
  pinned?: boolean; 
  color?: string;

  constructor(private todolistService: TodolistService) {}

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.title = this.list.title;
    this.listId.emit(this.list.id);
  }
}
