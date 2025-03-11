import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tag-form',
  imports: [ButtonComponent],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css'
})
export class TagFormComponent {
  @Output() saveData = new EventEmitter<boolean>();

  tagForm = new FormGroup({
    tagname: new FormControl('', Validators.required),
  })

  onCloseForm(dataResponse: boolean) {
    // Est-ce que je ne devrais pas gérer l'enregistrement du nouveau tag ici ?
    this.saveData.emit(dataResponse);
  }
}
