import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note.service';
import { ButtonComponent } from '../../buttons/button.component';
import { SaveFormComponent } from '../save-form/save-form.component';

@Component({
  selector: 'note-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, SaveFormComponent],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {
  @Input() noteData!: { id: number, title?: string, body: string, pinned?: boolean};
  @Output() isFormVisible = new EventEmitter<boolean>();
  @Output() noteUpdated = new EventEmitter<boolean>();

  noteForm: FormGroup;
  isSaveFormVisible = false;

  constructor(public noteService: NoteService) {
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('', Validators.required),
      isPinned: new FormControl(false)
    })
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    if (this.noteData) {
      this.noteForm.patchValue({
        title: this.noteData.title || '',
        body: this.noteData.body || '',
        isPinned: this.noteData.pinned || false,
      })
    }
  }

  closeForm() {
    this.isFormVisible.emit(false);
  }

  // on closing form, check if save form needs to be opened
  openSaveForm() {
    if (this.noteData) {
      if (this.noteData.title === this.noteForm.value.title && this.noteData.pinned === this.noteForm.value.isPinned && this.noteData.body === this.noteForm.value.body) {
        this.closeForm();
      } else {
        this.isSaveFormVisible = true;
      }
    } else {
      if (!this.noteForm.value.title) {
        this.closeForm();
      } else {
        this.isSaveFormVisible = true;
      }
    }
  }

  // Check if it is a update or a creation
  handleSaveFormClose(isSaved: boolean) {
    if (isSaved) {
      if (this.noteData) {
        const updatedNote = {
          id: this.noteData.id,
          title: this.noteForm.value.title,
          body: this.noteForm.value.body,
          pinned: this.noteForm.value.isPinned,
          color: 'grey'
        };

        this.noteService.updateNote(updatedNote).subscribe({
          next: () => {
            this.noteUpdated.emit(true);
            this.closeForm();
          },
          error: (error) => console.error("Update failed: ", error)
        });
      } else {
        const newNote = {
          title: this.noteForm.value.title,
          body: this.noteForm.value.body,
          pinned: this.noteForm.value.isPinned,
          color: 'grey'
        };

        console.log(newNote);

        this.noteService.createNote(newNote).subscribe({
          next: () => {
            this.noteUpdated.emit(true);
            this.closeForm();
          },
          error: (error) => console.error("Note creation failed: ", error)
        });
      }
    } else {
      this.closeForm();
    }
  }
}
