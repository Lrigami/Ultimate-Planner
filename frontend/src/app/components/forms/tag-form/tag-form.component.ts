import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../buttons/button.component';
import { ColorFormComponent } from '../color-form/color-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tag-form',
  imports: [CommonModule, ButtonComponent, ColorFormComponent],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css'
})
export class TagFormComponent {
  @Output() saveData = new EventEmitter<boolean>();
  saveColor = new EventEmitter<string>();
  isColorFormVisible = false;
  tagColor = 'grey';

  tagForm = new FormGroup({
    tagname: new FormControl('', Validators.required),
  })

  openColorForm() {
    this.isColorFormVisible = true;
  }

  handleColorFormClose(colorResponse: string) {
    // gérer ici l'enregistrement de la couleur 
    this.tagColor = colorResponse;
    this.isColorFormVisible = false;
  }

  onCloseForm(dataResponse: boolean) {
    // Est-ce que je ne devrais pas gérer l'enregistrement du nouveau tag ici ?
    // if (dataResponse) {
      
    // }
    this.saveData.emit(dataResponse);
    this.saveColor.emit(this.tagColor);
  }
}
