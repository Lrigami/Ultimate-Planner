import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'task-card',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: { id: number, title: string, description?: string, kanban_category?: string, due_date?: Date };
  titre: string = "card test";
  description?: string;
  kanban_category?: string = "to-do";
  due_date?: Date;
  tag?: string = "tag-test";

  
}
