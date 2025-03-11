import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../buttons/button.component';
import { SaveFormComponent } from '../save-form/save-form.component';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-form',
  imports: [ButtonComponent, SaveFormComponent, TagFormComponent, TaskService],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() taskData!: { id: number, title: string, description?: string, priority?: string, kanban_category?: string, due_date?: Date };
  @Output() isFormVisible = new EventEmitter<boolean>();
  taskUpdated = new EventEmitter<void>();
  isSaveFormVisible = false;
  isTagFormVisible = false;

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required), // Champ obligatoire
    description: new FormControl(''),
    priority: new FormControl(''),
    kanban_category: new FormControl(''),
    due_date: new FormControl('')
  });

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    if (this.taskData) {
      this.taskForm.patchValue({
        title: this.taskData.title,
        description: this.taskData.description,
        priority: this.taskData.priority,
        kanban_category: this.taskData.kanban_category,
        due_date: this.taskData.due_date ? new Date(this.taskData.due_date).toISOString().split('T')[0] : ''
      });
    }
  }

  closeForm() {
    this.isSaveFormVisible = true;
    this.isFormVisible.emit(false);
  }

  openNewTagForm() {
    this.isTagFormVisible = true;
  }

  handleSaveFormClose(dataResponse: boolean) {
    if (dataResponse) {
      const updatedTask = {
        id: this.taskData.id,
        title: this.taskData.title,
        description: this.taskData.description,
        dueDate: this.taskData.due_date,
        priority: this.taskData.priority,
        kanban: this.taskData.kanban_category
      };

      this.taskService.updateTask(updatedTask).subscribe({
        next: () => {
          this.taskUpdated.emit();
          this.isSaveFormVisible = false;
        },
        error: (error) => console.error("Update failed: ", error)
      });
    }
  }

  handleTagFormClose(dataResponse: boolean, colorResponse: string) {
    if (dataResponse) {
      // actualiser la liste des tags dans task-card pour qu'il apparaisse et soit sélectionnable par l'utilisateur directement
    }
    this.isTagFormVisible = false;
  }
}
