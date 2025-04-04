import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { Tag } from '../../../models/tag.model';
import { TaskService } from '../../../services/task.service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'task-card',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() task!: Task;
  @Input() tagsList: Tag[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() checked = new EventEmitter<void>();

  title?: string;
  description?: string;
  kanban_category?: string;
  due_date?: Date;
  priority?: string;
  done?: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2, private taskService: TaskService) {}

  ngOnInit() {
    this.updateCard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']?.currentValue) {
      this.updateCard();  
    }
  }

  ngAfterViewInit() {
    this.dateColor(); 
    this.checkColor();
  }

  // update the task-card with correct data after an update
  updateCard() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.priority = this.task.priority;
    this.kanban_category = this.task.kanban_category;
    this.due_date = this.task.due_date ? new Date(this.task.due_date) : undefined;
    this.done = this.task.done;
  }

  // truncate description to standardise task-card
  truncateDescription(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  // Set input checkbox color based on task priority
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

  // function to add days from a given date
  addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  // Set due date color based on how far away it is from now 
  // red: overdue or today / orange: 7 days from now / green : more than thar or if task is done
  dateColor() {
    const dateSpan = this.el.nativeElement.querySelector('.due-date-span');
    if (this.task.due_date && dateSpan) {
      if (this.addDays(new Date(), 7) < new Date(this.task.due_date)) {
        this.renderer.setStyle(dateSpan, 'color', 'var(--due-date-more-than-one-week)');
      } else if (this.addDays(new Date(), 0) > new Date(this.task.due_date)) {
        if (this.task.done) {
          this.renderer.setStyle(dateSpan, 'color', 'var(--due-date-more-than-one-week)');
        } else {
          this.renderer.setStyle(dateSpan, 'color', 'var(--overdue)');
        }
      } else {
        this.renderer.setStyle(dateSpan, 'color', 'var(--due-date-less-than-one-week)')
      }
    }
  }

  // if a task is checked it is updated and it is automatically put in "done" column (on kanban view)
  checkTask() {
    this.task.done = !this.task.done;
    this.task.kanban_category = this.task.done ? 'done' : 'to-do';

    const updatedTask = {
      ...this.task, 
      due_date: this.task.due_date ? new Date(this.task.due_date) : undefined
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        this.dateColor();
        this.updateCard();
        this.checked.emit();
      }, 
      error: (error) => console.error("Error checking task: ", error)
    });
  }
}
