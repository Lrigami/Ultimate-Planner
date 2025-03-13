import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'delete-form',
  imports: [ButtonComponent],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.css'
})
export class DeleteFormComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<boolean>();

  isFormVisible = false;

  constructor(public taskService: TaskService) {}

  handleDeleteFormClose(isDeleted: boolean) {
    if(isDeleted) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          this.taskDeleted.emit(true);
        },
        error: (error) => console.log("Delete failed: ", error)
      });
    }
    this.taskDeleted.emit(true);
  }
}
