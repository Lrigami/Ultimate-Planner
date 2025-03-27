import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { ToDoListsComponent } from './pages/to-do-lists/to-do-lists.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/password/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: 'todolist',
        title: 'My To Do lists',
        component: ToDoListsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'todolist/:tdlid',
        title: 'Selected to do list',
        component: ToDoListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        title: 'Authentification',
        component: SignInComponent,
    },
    { path: '', 
        redirectTo: '/auth', 
        pathMatch: 'full',
    },
    {
        path: 'forgotpassword',
        title: 'Forgot password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'resetpassword/:token',
        title: 'Reset password',
        component: ResetPasswordComponent,
    },
];