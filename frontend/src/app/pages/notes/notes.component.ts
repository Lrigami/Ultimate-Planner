import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { ButtonComponent } from '../../components/buttons/button.component';
import { DeleteFormComponent } from '../../components/forms/delete-form/delete-form.component';
import { NoteCardComponent } from '../../components/cards/note-card/note-card.component';
import { NoteFormComponent } from '../../components/forms/note-form/note-form.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, ButtonComponent, DeleteFormComponent, NoteCardComponent, NoteFormComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  isAddFormVisible = false;
  isEditFormVisible = false;
  isDeleteFormVisible = false;

  constructor(private noteService: NoteService) {}
  
  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.notes.sort((a, b) => a.sort_order - b.sort_order);
      },
      error: (error) => console.error("Error fetching notes: ", error)
    });
  }

  openNewNoteForm() {
    if(this.isDeleteFormVisible || this.isEditFormVisible) {
      return;
    }
    this.isAddFormVisible = true;
  }

  openEditForm(note: Note) {
    if(this.isDeleteFormVisible || this.isAddFormVisible) {
      return;
    }
    this.selectedNote = note;
    this.isEditFormVisible = true;
  }

  openDeleteForm(note: Note) {
    if(this.isEditFormVisible || this.isAddFormVisible) {
      return;
    }
    this.selectedNote = note;
    this.isDeleteFormVisible = true;
  }

  handleFormClose() {
    this.isEditFormVisible = false;
    this.isDeleteFormVisible = false;
    this.isAddFormVisible = false;
    this.loadNotes();
  }

  drop(event: CdkDragDrop<Note[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.updateSortOrder(event.container.data);
  }

  updateSortOrder(updatedNote: Note[]) {
    const updatedNoteArray = updatedNote.map((note, index) => ({
      id: note.id,
      sort_order: index + 1
    }));
    
    this.noteService.updateNotesOrder(updatedNoteArray).subscribe();
  }
}
