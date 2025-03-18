import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todolist } from '../../../models/todolist.model';
import { TodolistService } from '../../../services/to-do-list.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'to-do-list-card',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './to-do-list-card.component.html',
  styleUrl: './to-do-list-card.component.css'
})
export class ToDoListCardComponent {
  // Input pour passer des informations du parent vers l'enfant : de to-do-list-list à to-do-list-card ici
  @Input() list!: Todolist;
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
    console.log(this.list);
    this.title = this.list.title;
  }
}
