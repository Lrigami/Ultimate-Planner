import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
// import { ToDoListsComponent } from './pages/to-do-lists/to-do-lists.component';
// import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
