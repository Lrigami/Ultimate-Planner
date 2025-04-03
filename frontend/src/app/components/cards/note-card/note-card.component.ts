import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../models/note.model';
import { NoteService } from '../../../services/note.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'note-card',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();

  title?: string;
  body: string = '';
  pinned: boolean = false;
  color?: string;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.updateNote();
  }

  updateNote() {
    this.title = this.note.title;
    this.body = this.note.body;
  }

  pinToDashboard() {
    // logique à faire plus tard
  }
}
