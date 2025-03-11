import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'delete-form',
  imports: [ButtonComponent],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.css'
})
export class DeleteFormComponent {
  @Output() deleteData = new EventEmitter<boolean>()

  onCloseForm(deleteResponse: boolean) {
    this.deleteData.emit(deleteResponse);
  }
}
