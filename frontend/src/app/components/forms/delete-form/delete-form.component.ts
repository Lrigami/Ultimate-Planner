import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { Todolist } from '../../../models/todolist.model';
import { TaskService } from '../../../services/task.service';
import { TodolistService } from '../../../services/to-do-list.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'delete-form',
  imports: [ButtonComponent],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.css'
})
export class DeleteFormComponent {
  @Input() taskData!: Task;
  @Input() todolistData!: Todolist;
  @Output() taskDeleted = new EventEmitter<boolean>();
  @Output() todolistDeleted = new EventEmitter<boolean>();

  isFormVisible = false;

  constructor(public taskService: TaskService, public todolistService: TodolistService) {}

  // Call the right service depending on on which component is the delete button
  handleDeleteFormClose(isDeleted: boolean) {
    if (this.taskData) {
      if(isDeleted) {
        this.taskService.deleteTask(this.taskData.id).subscribe({
          next: () => {
            this.taskDeleted.emit(true);
          },
          error: (error) => console.log("Delete failed: ", error)
        });
      } else {
        this.taskDeleted.emit(true);
      }
    } else if (this.todolistData) {
      if(isDeleted) {
        this.todolistService.deleteList(this.todolistData.id).subscribe({
          next: () => {
            this.todolistDeleted.emit(true);
          },
          error: (error) => console.log("Delete failed: ", error)
        });
      } else {
        this.todolistDeleted.emit(true);
      }
    }
  }
}
