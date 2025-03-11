import { Component } from '@angular/core';
import { TaskCardComponent } from '../../cards/task-card/task-card.component';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks = [];

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.displayAll();
  }

  displayAll() {
    this.taskService.getAllTasks().subscribe({
      next: (alldata) => {
        this.tasks = alldata;
        console.log(this.tasks);
      },
      error: (error) => {
        console.log(error);
      }
  });
  }

}
