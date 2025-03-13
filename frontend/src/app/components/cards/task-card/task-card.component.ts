import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'task-card',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit, OnChanges {
  // Input pour passer des informations du parent vers l'enfant : par exemple de task-card à task-form
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  title?: string;
  description?: string;
  kanban_category?: string;
  due_date?: Date;
  priority?: string;
  
  isChecked = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateCard();
    this.checkColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']?.currentValue) {
      this.updateCard();
    }
  }

  updateCard() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.priority = this.task.priority;
    this.kanban_category = this.task.kanban_category;
    this.due_date = this.task.due_date;
  }

  truncateDescription(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  checkColor() {
    const checkbox = this.el.nativeElement.querySelector('input[type=checkbox]');
    if (this.task.priority === 'high') {
      this.renderer.setStyle(checkbox, 'borderColor', 'var(--red-outline)');
    } else if (this.task.priority === 'medium') {
      this.renderer.setStyle(checkbox, 'borderColor', 'var(--due-date-less-than-one-week)');
    } else if (this.task.priority === 'low') {
      this.renderer.setStyle(checkbox, 'borderColor', 'var(--green-outline)');
    } else {
      this.renderer.setStyle(checkbox, 'borderColor', 'var(--grey-outline)');
    }
  }
}
