import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'save-form',
  imports: [ButtonComponent],
  templateUrl: './save-form.component.html',
  styleUrl: './save-form.component.css'
})
export class SaveFormComponent {
  @Output() saveData = new EventEmitter<boolean>();

  onCloseForm(dataResponse: boolean) {
    this.saveData.emit(dataResponse);
  }
}
