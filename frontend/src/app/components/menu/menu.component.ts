import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from '../buttons/button.component';

@Component({
  selector: 'app-menu',
  imports: [ButtonComponent, MatSlideToggleModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
