import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../../services/tags.service';
import { ButtonComponent } from '../../buttons/button.component';
import { ColorFormComponent } from '../color-form/color-form.component';

@Component({
  selector: 'tag-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, ColorFormComponent],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css'
})
export class TagFormComponent {
  @Output() saveData = new EventEmitter<boolean>();
  @Output() saveColor = new EventEmitter<string>();

  tagForm: FormGroup;
  isColorFormVisible = false;
  tagColor = 'grey';

  constructor(private tagService: TagService) {
    this.tagForm = new FormGroup({
      tagname: new FormControl('', Validators.required),
    })
  }

  openColorForm() {
    this.isColorFormVisible = true;
  }

  handleColorFormClose(colorResponse: string) {
    // gérer ici l'enregistrement de la couleur 
    this.tagColor = colorResponse;
    this.isColorFormVisible = false;
  }

  onCloseForm(dataResponse: boolean) {
    console.log("dataresponse: ", dataResponse);
    if (dataResponse) {
      const newTag = {
        name: this.tagForm.value.tagname,
        color: this.tagColor
      };
      console.log("newTag: ", newTag);
      this.tagService.createTag(newTag).subscribe({
        next: (tag) => {
          console.log('tag: ', tag);
          this.saveData.emit(dataResponse)
        },
        error: (error) => console.error(error)
      });
    } else {
      this.saveData.emit(dataResponse);
      // this.saveColor.emit(this.tagColor);
    }
  }
}
