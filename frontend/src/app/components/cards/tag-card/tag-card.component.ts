import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'tag-card',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './tag-card.component.html',
  styleUrl: './tag-card.component.css'
})
export class TagCardComponent {
  @Input() name: string = '';
}
