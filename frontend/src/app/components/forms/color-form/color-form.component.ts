import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'color-form',
  imports: [],
  templateUrl: './color-form.component.html',
  styleUrl: './color-form.component.css'
})
export class ColorFormComponent {
  @Output() saveColor = new EventEmitter<string>();

  // onCloseForm(colorResponse: string) {
  //   this.saveColor.emit(colorResponse);
  // }
}
