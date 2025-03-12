import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { ButtonComponent } from '../../buttons/button.component';
import { SaveFormComponent } from '../save-form/save-form.component';
import { TagFormComponent } from '../tag-form/tag-form.component';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, SaveFormComponent, TagFormComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() taskData!: { id: number, title: string, description?: string, priority?: string, kanban_category?: string, due_date?: Date };
  @Output() isFormVisible = new EventEmitter<boolean>();
  taskUpdated = new EventEmitter<boolean>();

  taskForm: FormGroup;
  kanbanCategories: string[] = [];
  isSaveFormVisible = false;
  isTagFormVisible = false;

  constructor(public taskService: TaskService) {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      priority: new FormControl('undefined'),
      kanban_category: new FormControl('to-do'),
      due_date: new FormControl('')
    });
  }

  ngOnInit() {
    this.updateForm();
    this.taskService.getAllKanban().subscribe({
      next: (allKanban) => this.kanbanCategories = allKanban,
      error: (error) => console.error("Get Kanban failed: ", error)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskData'] && changes['taskData'].currentValue) {
      this.updateForm();
    }
  }

  updateForm() {
    if (this.taskData) {
      this.taskForm.patchValue({
        title: this.taskData.title || '',
        description: this.taskData.description || '',
        priority: this.taskData.priority || 'undefined',
        kanban_category: this.taskData.kanban_category || 'to-do',
        due_date: this.taskData.due_date ? new Date(this.taskData.due_date).toISOString().split('T')[0] : ''
      });
    }
  }

  closeForm() {
    this.isFormVisible.emit(false);
  }

  openNewTagForm() {
    this.isTagFormVisible = true;
  }

  handleSaveFormClose(isSaved: boolean) {
    if (isSaved) {
      const updatedTask = {
        id: this.taskData.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        due_date: this.taskForm.value.due_date ? new Date(this.taskForm.value.due_date) : undefined,
        priority: this.taskForm.value.priority,
        kanban_category: this.taskForm.value.kanban_category
      };

      this.taskService.updateTask(updatedTask).subscribe({
        next: () => {
          this.taskUpdated.emit(true);
          this.closeForm();
        },
        error: (error) => console.error("Update failed: ", error)
      });
    } else {
        this.closeForm();
    }
  }

  handleTagFormClose() {
    this.isTagFormVisible = false;
  }
}
