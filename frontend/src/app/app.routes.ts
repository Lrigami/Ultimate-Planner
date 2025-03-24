import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ToDoListsComponent } from './pages/to-do-lists/to-do-lists.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';

export const routes: Routes = [
    {
        path: 'todolist',
        title: 'My To Do lists',
        component: ToDoListsComponent,
    },
    {
        path: 'todolist/:tdlid',
        title: 'Selected to do list',
        component: ToDoListComponent,
    },
];
