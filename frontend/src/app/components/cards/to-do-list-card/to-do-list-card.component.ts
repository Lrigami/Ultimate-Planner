import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';
import { circleProgressConfig } from '../../../circle-progress.config';
import { Router } from '@angular/router';
import { Todolist } from '../../../models/todolist.model';
import { TodolistService } from '../../../services/to-do-list.service';
import { CommunicationService } from '../../../services/communication.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'to-do-list-card',
  standalone: true,
  imports: [CommonModule, NgCircleProgressModule, ButtonComponent],
  providers: [{ provide: CircleProgressOptions, useValue: circleProgressConfig }],
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
  pinned: boolean = false; 
  color?: string;

  constructor(private todolistService: TodolistService, private communicationService: CommunicationService, private router: Router) {}

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.title = this.list.title;
    this.listId.emit(this.list.id);
  }

  goToList() {
    this.router.navigate([`/todolist/${this.list.id}`]);
  }

  pinToMenu() {
    this.list.pinned = !this.list.pinned;
    this.todolistService.updateList(this.list).subscribe({
      next: (todolist) => {
        const isPinned = todolist.pinned;
        const listId = todolist.id;
        const listTitle = todolist.title;
        this.communicationService.updatePinnedState({isPinned: isPinned, tdlid: listId, title: listTitle});
      }
    })
  }
}
