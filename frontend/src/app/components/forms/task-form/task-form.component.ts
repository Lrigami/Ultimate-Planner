import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
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
  @Input() taskData!: { id: number, title: string, description?: string, priority?: string, kanban_category?: string, due_date?: Date, done?: boolean, to_do_list_id: number };
  @Input() kanbanData!: string;
  @Output() isFormVisible = new EventEmitter<boolean>();
  @Output() taskUpdated = new EventEmitter<boolean>();

  taskForm: FormGroup;
  kanbanCategories: string[] = [];
  isSaveFormVisible = false;
  isTagFormVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2, public taskService: TaskService) {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      priority: new FormControl('undefined'),
      kanban_category: new FormControl('to-do'),
      due_date: new FormControl(''),
      isChecked: new FormControl(false)
    });
  }

  ngOnInit() {
    this.updateForm();
    this.taskService.getAllKanban().subscribe({
      next: (allKanban) => this.kanbanCategories = allKanban,
      error: (error) => console.error("Get Kanban failed: ", error)
    });
    this.priorityColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskData']?.currentValue) {
      this.updateForm();
    }
    this.priorityColor();
  }

  // Cjeck checkbox if chosen kanban category is "done"
  onKanbanChange() {
    const selectedCategory = this.taskForm.get('kanban_category')?.value;
    this.taskForm.patchValue({
      isChecked: selectedCategory === 'done'
    });
  }

  // Change kanban category automatically to "done" if checkbox is checked
  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.taskForm.patchValue({
      kanban_category: isChecked ? 'done' : 'to-do'
    });
  }

  updateForm() {
    if (this.taskData) {
      this.taskForm.patchValue({
        title: this.taskData.title || '',
        description: this.taskData.description ?? '',
        priority: this.taskData.priority ?? 'undefined',
        kanban_category: this.taskData.kanban_category ?? 'to-do',
        due_date: this.taskData.due_date ? new Date(this.taskData.due_date).toLocaleDateString('fr-CA') : '',
        isChecked: this.taskData.done
      });
    } else if (this.kanbanData) {
      this.taskForm.patchValue({
        kanban_category: this.kanbanData ?? 'to-do'
      });
    }
  }

  closeForm() {
    this.isFormVisible.emit(false);
  }

  // On close form, check if save form needs to be opened
  openSaveForm() {
    if (this.taskData) {
      if (this.taskData.title === this.taskForm.value.title && (this.taskData.description === this.taskForm.value.description || !this.taskData.description) && new Date(this.taskData.due_date ? this.taskData.due_date : '').toDateString() === new Date(this.taskForm.value.due_date).toDateString() && this.taskData.priority === this.taskForm.value.priority && this.taskData.kanban_category === this.taskForm.value.kanban_category && this.taskData.done === this.taskForm.value.isChecked) {
        this.closeForm();
      } else {
        this.isSaveFormVisible = true;
      }
    } else {
      if (!this.taskForm.value.title && !this.taskForm.value.description) {
        this.closeForm();
      } else {
        this.isSaveFormVisible = true;
      }
    }
  }

  openNewTagForm() {
    this.isTagFormVisible = true;
  }

  // On closing form, check if it is an update or a creation
  handleSaveFormClose(isSaved: boolean) {
    if (isSaved) {
      if (this.taskData) {
        const updatedTask = {
          id: this.taskData.id,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          due_date: this.taskForm.value.due_date ? new Date(this.taskForm.value.due_date) : undefined,
          priority: this.taskForm.value.priority,
          kanban_category: this.taskForm.value.kanban_category,
          done: this.taskForm.value.isChecked,
        };

        this.taskService.updateTask(updatedTask).subscribe({
          next: () => {
            this.taskUpdated.emit(true);
            this.closeForm();
          },
          error: (error) => console.error("Update failed: ", error)
        });
      } else {
        const newTask = {
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          due_date: this.taskForm.value.due_date ? new Date(this.taskForm.value.due_date) : undefined,
          priority: this.taskForm.value.priority,
          kanban_category: this.taskForm.value.kanban_category,
          done: this.taskForm.value.isChecked,
        };

        this.taskService.createTask(newTask).subscribe({
          next: () => {
            this.taskUpdated.emit(true);
            this.closeForm();
          },
          error: (error) => console.error("Create task failed: ", error)
        });
      }
    } else {
      this.closeForm();
    }
  }

  handleTagFormClose() {
    this.isTagFormVisible = false;
  } 

  // Update segmented button color according to user choice
  priorityColor() {
    const priorityRadioBtn = this.el.nativeElement.querySelector('input[type=radio]:checked');
    const highPriority = this.el.nativeElement.querySelector('.high-priority');
    const mediumPriority = this.el.nativeElement.querySelector('.medium-priority');
    const lowPriority = this.el.nativeElement.querySelector('.low-priority');
    if (priorityRadioBtn) {
      if (priorityRadioBtn.value === 'high') {
        this.renderer.setStyle(highPriority, 'backgroundColor', 'var(--high-priority)');
        this.renderer.setStyle(mediumPriority, 'backgroundColor', 'white');
        this.renderer.setStyle(lowPriority, 'backgroundColor', 'white');
      } else if (priorityRadioBtn.value === 'medium') {
        this.renderer.setStyle(highPriority, 'backgroundColor', 'white');
        this.renderer.setStyle(mediumPriority, 'backgroundColor', 'var(--medium-priority)');
        this.renderer.setStyle(lowPriority, 'backgroundColor', 'white');
      } else if (priorityRadioBtn.value === 'low') {
        this.renderer.setStyle(highPriority, 'backgroundColor', 'white');
        this.renderer.setStyle(mediumPriority, 'backgroundColor', 'white');
        this.renderer.setStyle(lowPriority, 'backgroundColor', 'var(--low-priority)');
      }
    } else {
      return;
    }
  }
}
