import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponentGuard } from './guards/menu.guard';
import { MenuComponent } from './components/menu/menu.component';
// import { SignInComponent } from './pages/sign-in/sign-in.component';
// import { ToDoListsComponent } from './pages/to-do-lists/to-do-lists.component';
// import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  hideComponent: boolean = false;
  foldMenu: boolean = false;

  constructor(private router: Router, private guard: MenuComponentGuard) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.hideComponent = !this.guard.canActivate(null!, this.router.routerState.snapshot);
    });
  }

  updateMenuState(isFolded: boolean) {
    console.log("état passé: ", isFolded);
    this.foldMenu = isFolded;
  }
}
