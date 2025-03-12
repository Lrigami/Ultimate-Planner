import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'delete-form',
  imports: [ButtonComponent],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.css'
})
export class DeleteFormComponent {
  @Input() task!: Task;
  @Output() deleteData = new EventEmitter<boolean>()

  onCloseForm(deleteResponse: boolean) {
    this.deleteData.emit(deleteResponse);
  }
}
